import React from "react";
import { withStyles } from "material-ui/styles";
import StatusPanel from "containers/StatusPanel";
import TriggerPanel from "containers/TriggerPanel";
import PersistentTriggerPanel from "containers/PersistentTriggerPanel";
import NotificationManager from "containers/NotificationManager";

const styles = theme => ({
  root: {
    position: "absolute",
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    pointerEvents: "none"
  },
  middle: {
    display: "flex",
    width: "100vw",
    height: "100%"
  }
});

const HUD = ({ classes }) => (
  <div className={classes.root}>
    <div className={classes.top}>
      <div
        style={{
          display: "flex",
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "space-between"
        }}
      >
        <div>
          <StatusPanel />
          <PersistentTriggerPanel />
        </div>
        <div>
          <NotificationManager />
        </div>
      </div>
    </div>
    <div className={classes.middle} />
    <div>
      <TriggerPanel />
    </div>
  </div>
);

export default withStyles(styles)(HUD);
