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
  FormGroup,
  FormHelperText
} from "material-ui/Form";
import TextField from "material-ui/TextField";
import Switch from "material-ui/Switch";
import Grid from "material-ui/Grid";
import Select from "material-ui/Select";
import { MenuItem } from "material-ui/Menu";
import Tooltip from "material-ui/Tooltip";
import store from "store";
import connect from "hoc/connect";
import copyToClipboard from "utils/copyToClipboard";
import { GripStrengthString, GripStrengthEnum } from "game/enums/GripStrength";
import TaskList from "containers/TaskList";
import Group from "components/Group";
import { getRandomBoolean } from "utils/math";
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "material-ui/ExpansionPanel";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import ForkMe from "components/ForkMe";
import BackgroundImage from "images/background.jpg";

const styles = theme => ({
  control: {
    width: "100%"
  },
  button: {
    marginRight: theme.spacing.unit
  },
  background: {
    background: `url(${BackgroundImage})`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed"
  },
  title: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#222",
    padding: 80
  },
  formContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "0px 5vw 5vh 5vw"
  },
  form: {
    padding: 20,
    marginBottom: 20,
    width: "90vw",
    backgroundColor: "rgba(255, 255, 255, 0.9)"
  }
});

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

  handleTaskRandomize = event => {
    Object.keys(store.config.tasks).forEach(task => {
      store.config.tasks[task] = getRandomBoolean();
    });

    event.stopPropagation();
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
    const { copyToolTipOpen } = this.state;

    return (
      <div className={classes.background}>
        <ForkMe />
        <div className={classes.title}>
          <Typography
            variant="display3"
            color="inherit"
            style={{ fontFamily: "'Damion', cursive" }}
          >
            Fap Instructor
          </Typography>
          <Typography variant="body2" color="inherit">
            Make each fap session a unique and challenging experience
          </Typography>
        </div>
        <div className={classes.formContainer}>
          <Paper className={classes.form}>
            <Group title="Tumblr">
              <Grid container>
                <Grid item xs={12}>
                  <FormControl className={classes.control}>
                    <InputLabel>Tumblrs</InputLabel>
                    <Input
                      id="tumblrId"
                      value={store.config.tumblrId}
                      onChange={this.handleChange("tumblrId")}
                    />
                    <FormHelperText>
                      You can add multiple tumblrs each seperated by a comma
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
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
                          <Switch
                            checked={store.config.gifs}
                            onChange={this.handleCheckChange("gifs")}
                            value="gifs"
                          />
                        }
                        label="Gifs"
                      />
                      <FormControlLabel
                        control={
                          <Switch
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
                    <FormHelperText>
                      Just an estimate, other config options may impact this
                      setting
                    </FormHelperText>
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
                          <Switch
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
                          <Switch
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
                          <Switch
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
                          <Switch
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
                <Grid item xs={12} md={12}>
                  <TextField
                    id="maximumOrgasms"
                    label="Maximum Number of Orgasms"
                    value={store.config.maximumOrgasms}
                    onChange={this.handleChange("maximumOrgasms")}
                    fullWidth
                    type="number"
                    inputProps={{ step: "1", min: "1" }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={store.config.postOrgasmTorture}
                        onChange={this.handleCheckChange("postOrgasmTorture")}
                        value="postOrgasmTorture"
                      />
                    }
                    label="Post Orgasm Torure"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="postOrgasmTortureMinimumTime"
                    label="Post Orgasm Torture Minimum Time"
                    value={store.config.postOrgasmTortureMinimumTime}
                    onChange={this.handleChange("postOrgasmTortureMinimumTime")}
                    fullWidth
                    type="number"
                    inputProps={{ step: "1", min: "3" }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="postOrgasmTortureMaximumTime"
                    label="Post Orgasm Torture Maximum Time"
                    value={store.config.postOrgasmTortureMaximumTime}
                    onChange={this.handleChange("postOrgasmTortureMaximumTime")}
                    fullWidth
                    type="number"
                    inputProps={{ step: "1", min: "5" }}
                  />
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
                        <InputAdornment position="end">seconds</InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs />
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
                    <InputLabel>Ruin Cooldown</InputLabel>
                    <Input
                      id="ruinCooldown"
                      value={store.config.ruinCooldown}
                      onChange={this.handleChange("ruinCooldown")}
                      fullWidth
                      type="number"
                      inputProps={{ step: "1", min: "0" }}
                      endAdornment={
                        <InputAdornment position="end">seconds</InputAdornment>
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
                  <Switch
                    checked={store.config.enableVoice}
                    onChange={this.handleCheckChange("enableVoice")}
                    value="enableVoice"
                  />
                }
                label="Enable Voice"
              />
            </Group>
            <Group title="Tasks">
              <ExpansionPanel defaultExpanded>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Button
                    variant="raised"
                    color="primary"
                    className={classes.button}
                    onClick={this.handleTaskRandomize}
                  >
                    Randomize
                  </Button>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid container>
                    <Grid item xs={4}>
                      <TaskList
                        title="Speed"
                        tasks={{
                          doubleStrokes: "Double Strokes",
                          halvedStrokes: "Halved Strokes",
                          accelerationCycles: "Acceleration Cycles",
                          randomBeat: "Random Beats",
                          randomStrokeSpeed: "Random Stroke Speed",
                          redLightGreenLight: "Red Light Green Light"
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TaskList
                        title="Style"
                        tasks={{
                          dominant: "Dominant",
                          nondominant: "Nondominant",
                          headOnly: "Head Only",
                          shaftOnly: "Shaft Only",
                          gripAdjustments: "Grip Adjustments",
                          overhandGrip: "Overhand Grip"
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TaskList
                        title="Cock & Ball Torture"
                        tasks={{
                          bindCockBalls: "Bind Cock and Balls",
                          rubberBands: "Rubber Bands",
                          clothespins: "Clothespins",
                          headPalming: "Head Palming",
                          icyHot: "Icy Hot",
                          toothpaste: "Toothpaste",
                          ballSlaps: "Ball Slaps",
                          squeezeBalls: "Squeeze Balls",
                          breathPlay: "Breath Play",
                          scratching: "Scratching",
                          flicking: "Flicking",
                          cbtIce: "Icecubes"
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TaskList
                        title="Cum Eating"
                        tasks={{
                          precum: "Precum"
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TaskList
                        title="Anal"
                        tasks={{
                          buttplug: "Butt Plug"
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TaskList
                        title="Misc."
                        tasks={{
                          pickYourPoison: "Pick your Poison"
                        }}
                      />
                    </Grid>
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Group>
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
                leaveDelay={2000}
                open={copyToolTipOpen}
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

export default withStyles(styles)(withRouter(connect(ConfigPage)));
