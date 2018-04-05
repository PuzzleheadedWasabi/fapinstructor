import React from "react";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import connect from "hoc/connect";
import elapsedGameTime from "game/utils/elapsedGameTime";
import { round } from "utils/math";
import { GripStrengthString } from "game/enums/GripStrength";
import { StrokeStyleString } from "game/enums/StrokeStyle";
import logo from "images/logo.svg";
import DownIcon from "material-ui-icons/ArrowDropDown";
import UpIcon from "material-ui-icons/ArrowDropUp";

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
        )}
      </div>
    );
  }
}

export default withStyles(styles)(connect(StatusPanel));
