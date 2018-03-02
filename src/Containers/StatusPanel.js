import React from "react";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import connect from "hoc/connect";
import elapsedGameTime from "game/utils/elapsedGameTime";
import { round } from "utils/math";
import { GripStrengthString } from "game/enums/GripStrength";

const styles = theme => ({
  root: {
    opacity: "0.6",
    color: "white",
    backgroundColor: "black",
    position: "absolute",
    zIndex: 99,
    padding: 10
  },
  label: {
    opacity: "unset",
    width: 150,
    display: "inline-block"
  },
  labelValue: {
    opacity: "unset",
    display: "inline-block",
    fontWeight: "bold"
  }
});

const Label = ({ classes, name }) => (
  <Typography className={classes.label} color="secondary" variant="body2">
    {name}
  </Typography>
);

const LabelValue = ({ classes, value }) => (
  <Typography className={classes.labelValue} color="secondary" variant="body2">
    {value}
  </Typography>
);

const StatusPanel = ({ classes, game: { strokeSpeed, gripStrength } }) => (
  <div className={classes.root}>
    <Label classes={classes} name="Elapsed Time (min)" />
    <LabelValue classes={classes} value={elapsedGameTime("minutes")} />
    <Label classes={classes} name="Stroke Speed (s)" />
    <LabelValue classes={classes} value={round(strokeSpeed, 2)} />
    <Label classes={classes} name="Stroke Grip" />
    <LabelValue classes={classes} value={GripStrengthString[gripStrength]} />
  </div>
);

export default withStyles(styles)(connect(StatusPanel));
