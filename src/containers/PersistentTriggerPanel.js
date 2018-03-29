import React from "react";
import Button from "material-ui/Button";
import executeAction from "engine/executeAction";
import { ruinedOrgasm } from "game/actions/orgasm/ruin";

class PersistentTriggerPanel extends React.Component {
  state = {
    ruinedOrgasmDisabled: false
  };

  render() {
    return (
      <div>
        <Button
          variant="raised"
          color="primary"
          size="large"
          style={{ opacity: 0.8, margin: 10 }}
          disabled={this.state.ruinedOrgasmDisabled}
          onClick={() => {
            this.setState({ ruinedOrgasmDisabled: true });
            executeAction(ruinedOrgasm, true).then(() => {
              this.setState({ ruinedOrgasmDisabled: false });
            });
          }}
        >
          Ruin
        </Button>
      </div>
    );
  }
}

export default PersistentTriggerPanel;
