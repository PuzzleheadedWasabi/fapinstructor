import React from "react";
import { Base64 } from "js-base64";
import { withRouter } from "react-router-dom";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import Input, { InputLabel, InputAdornment } from "material-ui/Input";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup
} from "material-ui/Form";
import TextField from "material-ui/TextField";
import Checkbox from "material-ui/Checkbox";
import Grid from "material-ui/Grid";
import Select from "material-ui/Select";
import { MenuItem } from "material-ui/Menu";
import Tooltip from "material-ui/Tooltip";
import store from "store";
import copyToClipboard from "utils/copyToClipboard";
import { GripStrengthString, GripStrengthEnum } from "game/enums/GripStrength";

const styles = theme => ({
  control: {
    width: "100%"
  },
  button: {
    marginRight: theme.spacing.unit
  }
});

const Group = ({ title, children }) => (
  <div style={{ marginBottom: 30 }}>
    <div style={{ marginBottom: 15 }}>
      <Typography variant="title" color="primary">
        {title}
      </Typography>
    </div>
    <div>{children}</div>
  </div>
);

class ConfigPage extends React.Component {
  state = {
    copyToolTipOpen: false
  };

  handleChange = name => event => {
    store.config[name] = event.target.value;
  };

  handleCheckChange = name => (event, checked) => {
    store.config[name] = checked;
  };

  generateLink(isAbsolute = true) {
    const encodedValues = Base64.encodeURI(JSON.stringify(store.config));

    let url = "";
    if (isAbsolute) {
      url = window.location.host;
    }
    url += `/game/${encodedValues}`;

    return url;
  }

  handleGenerateLink = () => {
    this.setState({
      copyToolTipOpen: true
    });
    copyToClipboard(this.generateLink());
  };

  handleStart = () => {
    this.props.history.push(this.generateLink(false));
  };

  render() {
    const { classes } = this.props;

    return (
      <div
        style={{
          background: "linear-gradient(#D02558,black 40%)"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            color: "#FFF",
            padding: 20
          }}
        >
          <Typography
            variant="display3"
            color="inherit"
            style={{ fontFamily: "'Damion', cursive" }}
          >
            Fap Instructor
          </Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Paper style={{ padding: 20, marginBottom: 20, width: "90vw" }}>
            <Group title="Tumblr">
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    id="tumblrId"
                    label="Tumblr"
                    value={store.config.tumblrId}
                    onChange={this.handleChange("tumblrId")}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="tumblrOffset"
                    label="Offset"
                    value={store.config.tumblrOffset}
                    onChange={this.handleChange("tumblrOffset")}
                    helperText="The number of tumblr posts to skip"
                    fullWidth
                    type="number"
                    inputProps={{ step: "50", min: "0" }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl className={classes.control}>
                    <InputLabel>Slide Duration</InputLabel>
                    <Input
                      id="slideDuration"
                      value={store.config.slideDuration}
                      onChange={this.handleChange("slideDuration")}
                      type="number"
                      inputProps={{ step: "1", min: "1" }}
                      endAdornment={
                        <InputAdornment position="end">seconds</InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Image Type</FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={store.config.gifs}
                            onChange={this.handleCheckChange("gifs")}
                            value="gifs"
                          />
                        }
                        label="Gifs"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={store.config.pictures}
                            onChange={this.handleCheckChange("pictures")}
                            value="pictures"
                          />
                        }
                        label="Pictures"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Group>
            <Group title="Time">
              <Grid container>
                <Grid item xs={12} md={6}>
                  <FormControl className={classes.control}>
                    <InputLabel>Minimum Game Time</InputLabel>
                    <Input
                      id="minimumGameTime"
                      value={store.config.minimumGameTime}
                      onChange={this.handleChange("minimumGameTime")}
                      type="number"
                      inputProps={{ step: "1", min: "1" }}
                      endAdornment={
                        <InputAdornment position="end">minutes</InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl className={classes.control}>
                    <InputLabel>Maximum Game Time</InputLabel>
                    <Input
                      id="maximumGameTime"
                      value={store.config.maximumGameTime}
                      onChange={this.handleChange("maximumGameTime")}
                      type="number"
                      inputProps={{ step: "1", min: "5" }}
                      endAdornment={
                        <InputAdornment position="end">minutes</InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Group>
            <Group title="Orgasm">
              <Grid container>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Final Orgasm</FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={store.config.finalOrgasmAllowed}
                            onChange={this.handleCheckChange(
                              "finalOrgasmAllowed"
                            )}
                            value="finalOrgasmAllowed"
                          />
                        }
                        label="Allowed"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={store.config.finalOrgasmDenied}
                            onChange={this.handleCheckChange(
                              "finalOrgasmDenied"
                            )}
                            value="finalOrgasmDenied"
                          />
                        }
                        label="Denied"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={store.config.finalOrgasmRuined}
                            onChange={this.handleCheckChange(
                              "finalOrgasmRuined"
                            )}
                            value="finalOrgasmRuined"
                          />
                        }
                        label="Ruined"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={store.config.finalOrgasmRandom}
                            onChange={this.handleCheckChange(
                              "finalOrgasmRandom"
                            )}
                            value="finalOrgasmRandom"
                          />
                        }
                        label="Random (applies to selected)"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="minimumEdges"
                    label="Minimum Edges"
                    value={store.config.minimumEdges}
                    onChange={this.handleChange("minimumEdges")}
                    fullWidth
                    type="number"
                    inputProps={{ step: "1", min: "0" }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="minimumRuinedOrgasms"
                    label="Minimum Ruined Orgasms"
                    value={store.config.minimumRuinedOrgasms}
                    onChange={this.handleChange("minimumRuinedOrgasms")}
                    fullWidth
                    type="number"
                    inputProps={{ step: "1", min: "0" }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="maximumRuinedOrgasms"
                    label="Maximum Ruined Orgasms"
                    value={store.config.maximumRuinedOrgasms}
                    onChange={this.handleChange("maximumRuinedOrgasms")}
                    fullWidth
                    type="number"
                    inputProps={{ step: "1", min: "0" }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl className={classes.control}>
                    <InputLabel>Ruined Orgasm Probability</InputLabel>
                    <Input
                      id="ruinedOrgasmProbability"
                      value={store.config.ruinedOrgasmProbability}
                      onChange={this.handleChange("ruinedOrgasmProbability")}
                      type="number"
                      inputProps={{ step: "10", min: "0", max: "100" }}
                      endAdornment={
                        <InputAdornment position="end">%</InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl className={classes.control}>
                    <InputLabel>Edge Cooldown</InputLabel>

                    <Input
                      id="edgeCooldown"
                      value={store.config.edgeCooldown}
                      onChange={this.handleChange("edgeCooldown")}
                      fullWidth
                      type="number"
                      inputProps={{ step: "1", min: "0" }}
                      endAdornment={
                        <InputAdornment position="end">%</InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Group>
            <Group title="Stroke">
              <Grid container>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="slowestStrokeSpeed"
                    label="Slowest Stroke Speed"
                    value={store.config.slowestStrokeSpeed}
                    onChange={this.handleChange("slowestStrokeSpeed")}
                    fullWidth
                    type="number"
                    inputProps={{ step: "0.25", min: "0", max: "6" }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="fastestStrokeSpeed"
                    label="Fastest Stroke Speed"
                    value={store.config.fastestStrokeSpeed}
                    onChange={this.handleChange("fastestStrokeSpeed")}
                    fullWidth
                    type="number"
                    inputProps={{ step: "0.25", min: "0.5", max: "6" }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl className={classes.control}>
                    <InputLabel>Initial Grip Strength</InputLabel>
                    <Select
                      value={store.config.initialGripStrength}
                      onChange={this.handleChange("initialGripStrength")}
                    >
                      {Object.keys(GripStrengthEnum).map(key => (
                        <MenuItem key={key} value={GripStrengthEnum[key]}>
                          {GripStrengthString[GripStrengthEnum[key]]}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Group>
            <Group title="Misc.">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={store.config.disableVoice}
                    onChange={this.handleCheckChange("disableVoice")}
                    value="disableVoice"
                  />
                }
                label="Disable Voice"
              />
            </Group>
            <Group title="Tasks">Tasks</Group>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="raised"
                color="primary"
                className={classes.button}
                onClick={this.handleStart}
              >
                Start
              </Button>
              <Tooltip
                id="generate-link-tooltip"
                title="Copied to Clipboard"
                leaveDelay={300}
                open={this.state.copyToolTipOpen}
                onClose={() => {
                  this.setState({
                    copyToolTipOpen: false
                  });
                }}
                placement="bottom"
              >
                <Button
                  variant="raised"
                  color="secondary"
                  className={classes.button}
                  onClick={this.handleGenerateLink}
                >
                  Generate Link
                </Button>
              </Tooltip>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(ConfigPage));
