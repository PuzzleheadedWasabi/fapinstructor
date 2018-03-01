import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import connect from "hoc/connect";
import executeAction from "engine/executeAction";

const styles = theme => ({
  root: {
    position: "absolute",
    zIndex: 99,
    bottom: 0,
    left: "50vw",
    opacity: 0.7,
    backgroundColor: "white"
  }
});

const ActionPanel = ({ classes, engine: { actionTriggers } }) => (
  <div className={classes.root}>
    {actionTriggers &&
      actionTriggers.map((trigger, index) => (
        <Button
          variant="raised"
          color="primary"
          style={{ margin: 10 }}
          key={index}
          onClick={() => executeAction(trigger)}
        >
          {trigger.label}
        </Button>
      ))}
  </div>
);

ActionPanel.propTypes = {};

export default withStyles(styles)(connect(ActionPanel));
