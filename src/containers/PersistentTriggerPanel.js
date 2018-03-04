import React from "react";
import Button from "material-ui/Button";

const PersistentTriggerPanel = () => (
  <div>
    <Button
      variant="raised"
      color="primary"
      size="large"
      style={{ opacity: 0.8, margin: 10 }}
      onClick={() => {
        console.log("interrupt test ");
      }}
    >
      Ruin
    </Button>
  </div>
);

export default PersistentTriggerPanel;
