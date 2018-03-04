import React from "react";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import connect from "hoc/connect";
import executeAction from "engine/executeAction";

const styles = theme => ({
  triggers: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100vw"
  }
});

const TriggerPanel = ({ classes, engine: { actionTriggers } }) => (
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
);

export default withStyles(styles)(connect(TriggerPanel));
