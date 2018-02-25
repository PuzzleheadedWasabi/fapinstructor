import React from "react";
import connect from "../../hoc/connect";
import GameEngine from "../../engine/GameEngine";
import executeAction from "../../engine/executeAction";

const engine = new GameEngine();

class GamePage extends React.Component {
  componentDidMount() {
    engine.start();
  }

  componentWillUnmount() {
    engine.stop();
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
