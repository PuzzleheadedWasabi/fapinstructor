import React from "react";
import { Base64 } from "js-base64";
import connect from "hoc/connect";
import { startGame, stopGame } from "game";
import executeAction from "engine/executeAction";
import store from "store";

class GamePage extends React.Component {
  constructor(props) {
    super(props);

    const encodedConfig = props.match.params.config;
    if (encodedConfig) {
      const decodedConfig = Base64.decode(encodedConfig);
      debugger;
      const config = JSON.parse(decodedConfig);
      store.config = config;
    } else {
      throw new Error("Unable to decode URL configuration paramaters")
    }
  }

  componentDidMount() {
    startGame();
  }

  componentWillUnmount() {
    stopGame();
  }

  handleInterruptTest() {
    executeAction(async () => {
      console.log("test");
    }, true);
  }

  render() {
    const { executing, actionTriggers } = this.props.engine;

    return (
      <div>
        executing:{executing.toString()}
        <br />
        <button onClick={this.handleInterruptTest}>InterruptTest</button>
        <br />
        {actionTriggers &&
          actionTriggers.map((trigger, index) => (
            <button key={index} onClick={() => executeAction(trigger)}>
              {trigger.label}
            </button>
          ))}
      </div>
    );
  }
}

export default connect(GamePage);
