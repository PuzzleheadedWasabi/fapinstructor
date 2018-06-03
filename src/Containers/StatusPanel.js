import React from "react";
// mui
import { Switch, Button } from "material-ui";
import { FormControlLabel } from "material-ui/Form";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import DownIcon from "material-ui-icons/ArrowDropDown";
import UpIcon from "material-ui-icons/ArrowDropUp";
import VolumeOffIcon from "material-ui-icons/VolumeOff";
import VolumeOnIcon from "material-ui-icons/VolumeUp";
// internal
import connect from "hoc/connect";
import elapsedGameTime from "game/utils/elapsedGameTime";
import { round } from "utils/math";
import { GripStrengthString } from "game/enums/GripStrength";
import { StrokeStyleString } from "game/enums/StrokeStyle";
import logo from "images/logo.svg";
import store from "store";

const styles = theme => ({
  root: {
    padding: 5,
    background: "rgba(0, 0, 0, 0.6)",
    pointerEvents: "auto"
  },
  header: {
    display: "flex",
    alignItems: "center",
    color: "white"
  },
  labels: {
    display: "flex"
  },
  toggle: {
    color: "white"
  }
});

const Label = ({ value }) => (
  <Typography color="secondary" variant="body2">
    {value}
  </Typography>
);

class StatusPanel extends React.Component {
  state = {
    open: true,
    strokeSpeedUnit: "seconds"
  };

  handleCheckChange = name => (event, checked) => {
    try {
      localStorage.setItem(name, checked);
    } catch (e) {
      // local storage may not be supported on some devices
    }
    store.config[name] = checked;
  };

  handleSwitchStrokeSpeedUnit = () => {
    let strokeSpeedUnit;

    if (this.state.strokeSpeedUnit === "minutes") {
      strokeSpeedUnit = "seconds";
    } else {
      strokeSpeedUnit = "minutes";
    }

    this.setState({
      strokeSpeedUnit
    });
  };

  render() {
    const { open, strokeSpeedUnit } = this.state;
    const {
      classes,
      game: {
        strokeSpeed,
        gripStrength,
        strokeStyle,
        buttPlugInserted,
        rubberBands,
        clothespins,
        cockAndBallsBound,
        edges,
        ruins,
        orgasms
      }
    } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <Button
            color="inherit"
            style={{ textTransform: "none", width: "100%" }}
            onClick={() => this.setState({ open: !open })}
          >
            <img style={{ width: 25, marginRight: 10 }} src={logo} alt="Logo" />
            <Typography color="inherit" variant="body2">
              Fap Instructor
            </Typography>
            {open ? <DownIcon /> : <UpIcon />}
          </Button>
        </div>
        {open && (
          <div>
            <div className={classes.labels}>
              <div style={{ marginRight: 10 }}>
                <Label value="Elapsed Time (min)" />
                <div onClick={this.handleSwitchStrokeSpeedUnit}>
                  <Label
                    value={`Stroke Speed (${
                      strokeSpeedUnit === "minutes" ? "min" : "sec"
                    })`}
                  />
                </div>
                <Label value="Stroke Grip" />
                <Label value="Stroke Style" />
                {buttPlugInserted && <Label value="Butt Plug" />}
                {rubberBands > 0 && <Label value="Rubberbands" />}
                {clothespins > 0 && <Label value="Clothepins" />}
                {cockAndBallsBound && <Label value="Cock & Balls" />}
                {edges > 0 && <Label value="Edges" />}
                {ruins > 0 && <Label value="Ruins" />}
                {orgasms > 0 && <Label value="Orgasms" />}
              </div>
              <div>
                <Label value={elapsedGameTime("minutes")} />
                <div onClick={this.handleSwitchStrokeSpeedUnit}>
                  <Label
                    value={round(
                      strokeSpeedUnit === "minutes"
                        ? strokeSpeed * 60
                        : strokeSpeed,
                      2
                    )}
                  />
                </div>
                <Label value={GripStrengthString[gripStrength]} />
                <Label value={StrokeStyleString[strokeStyle]} />
                {buttPlugInserted && <Label value="Inserted" />}
                {rubberBands > 0 && <Label value={rubberBands} />}
                {clothespins > 0 && <Label value={clothespins} />}
                {cockAndBallsBound && <Label value="Bound" />}
                {edges > 0 && <Label value={edges} />}
                {ruins > 0 && <Label value={ruins} />}
                {orgasms > 0 && <Label value={orgasms} />}
              </div>
            </div>
            <div>
              <FormControlLabel
                control={
                  <Switch
                    checked={store.config.enableVoice}
                    onChange={this.handleCheckChange("enableVoice")}
                    value="enableVoice"
                  />
                }
                classes={{
                  label: classes.toggle
                }}
                label="Voice"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={store.config.enableMoans}
                    onChange={this.handleCheckChange("enableMoans")}
                    value="enableMoans"
                  />
                }
                classes={{
                  label: classes.toggle
                }}
                label="Moans"
              />
              {window.context && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: 10
                  }}
                >
                  <Button
                    style={{ marginRight: 10 }}
                    mini
                    variant="fab"
                    color="secondary"
                    disabled={window.context.state === "running"}
                    onClick={() => {
                      window.context.resume();
                    }}
                  >
                    <VolumeOnIcon />
                  </Button>
                  <Button
                    mini
                    variant="fab"
                    color="secondary"
                    disabled={window.context.state !== "running"}
                    onClick={() => {
                      window.context.suspend();
                    }}
                  >
                    <VolumeOffIcon />
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(connect(StatusPanel));
