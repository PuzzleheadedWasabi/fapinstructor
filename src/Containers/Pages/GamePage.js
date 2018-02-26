import React from "react";
import connect from "../../hoc/connect";
import { startGame, stopGame } from "../../game";
import executeAction from "../../engine/executeAction";

class GamePage extends React.Component {
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
    const { executing, actionTriggers } = this.props;

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
