import React from "react";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
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

const styles = theme => ({
  control: {
    width: "100%"
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

const GripStrengthStrings = [
  "Barely Touching",
  "Very Light",
  "Light",
  "Normal",
  "Tight",
  "Very Tight",
  "Death Grip"
];

const GripStrength = {
  BarelyTouching: 0,
  VeryLight: 1,
  Light: 2,
  Normal: 3,
  Tight: 4,
  VeryTight: 5,
  DeathGrip: 6
};

class ConfigPage extends React.Component {
  state = {
    tumblrId: "fapstergifs",
    gifs: true,
    pictures: false,
    tumblrOffset: 0,
    slideDuration: 10, // sec
    disableVoice: false,
    finalOrgasmAllowed: true,
    finalOrgasmDenied: false,
    finalOrgasmRuined: false,
    finalOrgasmRandom: false,
    minimumGameTime: 5, // min
    maximumGameTime: 20, // min
    minimumEdges: 0,
    minimumRuinedOrgasms: 0,
    maximumRuinedOrgasms: 0,
    ruinedOrgasmProbability: 50, // %
    edgeCooldown: 5, // sec
    slowestStrokeSpeed: 0.25, // sec
    fastestStrokeSpeed: 5, // sec
    initalGripStrength: GripStrength.Normal
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleCheckChange = name => (event, checked) => {
    this.setState({ [name]: checked });
  };

  render() {
    const { classes } = this.props;

    return (
      <div style={{ marginLeft: 10 }}>
        <Group title="Tumblr">
          <Grid container>
            <Grid item xs={12}>
              <TextField
                id="tumblrId"
                label="Tumblr"
                value={this.state.tumblrId}
                onChange={this.handleChange("tumblrId")}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="tumblrOffset"
                label="Offset"
                value={this.state.tumblrOffset}
                onChange={this.handleChange("tumblrOffset")}
                helperText="The number of tumblr posts to skip"
                fullWidth
                type="number"
                inputProps={{ step: "50", min: "0" }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl className={classes.control}>
                <InputLabel>Slide Duration</InputLabel>
                <Input
                  id="slideDuration"
                  value={this.state.slideDuration}
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
                        checked={this.state.gifs}
                        onChange={this.handleCheckChange("gifs")}
                        value="gifs"
                      />
                    }
                    label="Gifs"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.pictures}
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
            <Grid item xs={6}>
              <FormControl className={classes.control}>
                <InputLabel>Minimum Game Time</InputLabel>
                <Input
                  id="minimumGameTime"
                  value={this.state.minimumGameTime}
                  onChange={this.handleChange("minimumGameTime")}
                  type="number"
                  inputProps={{ step: "1", min: "1" }}
                  endAdornment={
                    <InputAdornment position="end">minutes</InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl className={classes.control}>
                <InputLabel>Maximum Game Time</InputLabel>
                <Input
                  id="maximumGameTime"
                  value={this.state.maximumGameTime}
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
                        checked={this.state.finalOrgasmAllowed}
                        onChange={this.handleCheckChange("finalOrgasmAllowed")}
                        value="finalOrgasmAllowed"
                      />
                    }
                    label="Allowed"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.finalOrgasmDenied}
                        onChange={this.handleCheckChange("finalOrgasmDenied")}
                        value="finalOrgasmDenied"
                      />
                    }
                    label="Denied"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.finalOrgasmRuined}
                        onChange={this.handleCheckChange("finalOrgasmRuined")}
                        value="finalOrgasmRuined"
                      />
                    }
                    label="Ruined"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.finalOrgasmRandom}
                        onChange={this.handleCheckChange("finalOrgasmRandom")}
                        value="finalOrgasmRandom"
                      />
                    }
                    label="Random (applies to selected)"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="minimumEdges"
                label="Minimum Edges"
                value={this.state.minimumEdges}
                onChange={this.handleChange("minimumEdges")}
                fullWidth
                type="number"
                inputProps={{ step: "1", min: "0" }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="minimumRuinedOrgasms"
                label="Minimum Ruined Orgasms"
                value={this.state.minimumRuinedOrgasms}
                onChange={this.handleChange("minimumRuinedOrgasms")}
                fullWidth
                type="number"
                inputProps={{ step: "1", min: "0" }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="maximumRuinedOrgasms"
                label="Maximum Ruined Orgasms"
                value={this.state.maximumRuinedOrgasms}
                onChange={this.handleChange("maximumRuinedOrgasms")}
                fullWidth
                type="number"
                inputProps={{ step: "1", min: "0" }}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl className={classes.control}>
                <InputLabel>Ruined Orgasm Probability</InputLabel>
                <Input
                  id="ruinedOrgasmProbability"
                  value={this.state.ruinedOrgasmProbability}
                  onChange={this.handleChange("ruinedOrgasmProbability")}
                  type="number"
                  inputProps={{ step: "10", min: "0", max: "100" }}
                  endAdornment={
                    <InputAdornment position="end">%</InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl className={classes.control}>
                <InputLabel>Edge Cooldown</InputLabel>

                <Input
                  id="edgeCooldown"
                  value={this.state.edgeCooldown}
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
            <Grid item xs={4}>
              <TextField
                id="slowestStrokeSpeed"
                label="Slowest Stroke Speed"
                value={this.state.slowestStrokeSpeed}
                onChange={this.handleChange("slowestStrokeSpeed")}
                fullWidth
                type="number"
                inputProps={{ step: "0.25", min: "0", max: "6" }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="fastestStrokeSpeed"
                label="Fastest Stroke Speed"
                value={this.state.fastestStrokeSpeed}
                onChange={this.handleChange("fastestStrokeSpeed")}
                fullWidth
                type="number"
                inputProps={{ step: "0.25", min: "0.5", max: "6" }}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl className={classes.control}>
                <InputLabel>Initial Grip Strength</InputLabel>
                <Select
                  value={this.state.initalGripStrength}
                  onChange={this.handleChange("initalGripStrength")}
                >
                  {Object.keys(GripStrength).map(key => (
                    <MenuItem key={key} value={GripStrength[key]}>
                      {GripStrengthStrings[GripStrength[key]]}
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
                checked={this.state.disableVoice}
                onChange={this.handleCheckChange("disableVoice")}
                value="disableVoice"
              />
            }
            label="Disable Voice"
          />
        </Group>
        <Group title="Tasks">Tasks</Group>
        <Button variant="raised" color="primary" onClick={this.handleComplete}>
          Start
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(ConfigPage);
