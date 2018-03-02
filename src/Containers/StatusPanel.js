import React from "react";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import connect from "hoc/connect";
import elapsedGameTime from "game/utils/elapsedGameTime";
import { round } from "utils/math";
import { GripStrengthString } from "game/enums/GripStrength";
import logo from "images/logo.svg";

const styles = theme => ({
  root: {
    position: "absolute",
    zIndex: 99,
    padding: 5,
    background: "rgba(0, 0, 0, 0.6)"
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
    open: true
  };

  render() {
    const { open } = this.state;
    const { classes, game: { strokeSpeed, gripStrength } } = this.props;

    return (
      <div className={classes.root}>
        <div
          className={classes.header}
          onClick={() => this.setState({ open: !open })}
        >
          <Button
            color="inherit"
            style={{ textTransform: "none", width: "100%" }}
          >
            <img style={{ width: 25, marginRight: 10 }} src={logo} alt="Logo" />
            <Typography color="inherit" variant="body2">
              Fap Instructor
            </Typography>
          </Button>
        </div>
        {open && (
          <div className={classes.labels}>
            <div style={{ marginRight: 10 }}>
              <Label value="Elapsed Time (min)" />
              <Label value="Stroke Speed (s)" />
              <Label value="Stroke Grip" />
            </div>
            <div>
              <Label value={elapsedGameTime("minutes")} />
              <Label value={round(strokeSpeed, 2)} />
              <Label value={GripStrengthString[gripStrength]} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(connect(StatusPanel));
