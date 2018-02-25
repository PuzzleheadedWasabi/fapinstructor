import React from "react";
import connect from "../../hoc/connect";
import executeAction from "../../engine/executeAction";
import a from "../../actions/a";

class GamePage extends React.Component {
  handleClick() {
    executeAction(a);
  }

  render() {
    const { executing } = this.props;

    return (
      <div>
        GamePage<br />executing:{executing.toString()}
        <button onClick={this.handleClick}>Click</button>
      </div>
    );
  }
}

export default connect(GamePage);
