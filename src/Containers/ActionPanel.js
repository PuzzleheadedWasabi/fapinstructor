import React from "react";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import connect from "hoc/connect";
import executeAction from "engine/executeAction";

const styles = theme => ({
  root: {
    position: "absolute",
    zIndex: 99,
    bottom: 0,
    width: "100vw"
  },
  triggers: {
    display: "flex",
    justifyContent: "center"
  }
});

const ActionPanel = ({ classes, engine: { actionTriggers } }) => (
  <div>
    <div className={classes.root}>
      <Button
        variant="raised"
        color="primary"
        size="large"
        style={{ margin: 10 }}
        onClick={() => {
          console.log("interrupt test ");
        }}
      >
        Ruin
      </Button>
    </div>
    <div className={classes.root}>
      <div className={classes.triggers}>
        {actionTriggers &&
          actionTriggers.map((trigger, index) => (
            <Button
              variant="raised"
              color="secondary"
              size="large"
              style={{ margin: 10 }}
              key={index}
              onClick={() => executeAction(trigger)}
            >
              {trigger.label}
            </Button>
          ))}
      </div>
    </div>
  </div>
);

export default withStyles(styles)(connect(ActionPanel));
