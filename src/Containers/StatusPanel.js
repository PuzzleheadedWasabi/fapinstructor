import React from "react";
import { withStyles } from "material-ui/styles";
import connect from "hoc/connect";

const styles = theme => ({
  root: {
    opacity: "0.6",
    color: "white",
    backgroundColor: "black",
    position: "absolute",
    zIndex: 99,
    padding: 10
  }
});

const StatusPanel = ({ classes }) => (
  <div className={classes.root}>This is a test</div>
);

export default withStyles(styles)(connect(StatusPanel));
