import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Button from 'material-ui/Button';
import connect from "hoc/connect";

const styles = theme => ({
  root: {
    position: "absolute",
    zIndex: 5,
    bottom: 0,
    padding: 10
  }
});

const InterruptActionPanel = ({ classes }) => (
  <div className={classes.root}>
    <Button
      variant="raised"
      color="primary"
      onClick={() => {
        console.log("interrupt test ");
      }}
    >
      Ruined
    </Button>
  </div>
);

InterruptActionPanel.propTypes = {};

export default withStyles(styles)(connect(InterruptActionPanel));
