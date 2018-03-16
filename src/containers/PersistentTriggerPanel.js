import React from "react";
import Button from "material-ui/Button";
import executeAction from "engine/executeAction";
import { ruinedOrgasm } from "game/actions/orgasm/ruin";

const PersistentTriggerPanel = () => (
  <div>
    <Button
      variant="raised"
      color="primary"
      size="large"
      style={{ opacity: 0.8, margin: 10 }}
      onClick={() => {
        executeAction(ruinedOrgasm(), true);
      }}
    >
      Ruin
    </Button>
  </div>
);

export default PersistentTriggerPanel;
