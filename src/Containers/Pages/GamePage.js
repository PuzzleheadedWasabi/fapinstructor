import React from "react";
import { Base64 } from "js-base64";
import connect from "hoc/connect";
import { startGame, stopGame } from "game";
import executeAction from "engine/executeAction";
import store from "store";
import CustomError from "utils/CustomError"

class GamePage extends React.Component {
  constructor(props) {
    super(props);

    const config = Base64.decode(props.match.params.config);
    try {
      store.config = JSON.parse(config);
    }
    catch (error) {
      throw new CustomError(`Unable to decode URL configuration paramaters, ${config}`, error)
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
