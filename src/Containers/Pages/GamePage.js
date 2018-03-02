import React from "react";
import { Base64 } from "js-base64";
import { withStyles } from "material-ui/styles";
import connect from "hoc/connect";
import { startGame, stopGame } from "game";
import executeAction from "engine/executeAction";
import store from "store";
import CustomError from "utils/CustomError";
import ImagePlayer from "Components/ImagePlayer";
import StatusPanel from "Containers/StatusPanel";
import ActionPanel from "Containers/ActionPanel";
import { CircularProgress } from "material-ui/Progress";

const styles = theme => ({
  progress: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: '100vw',
    height: '100vh'
  }
});

class GamePage extends React.Component {
  constructor(props) {
    super(props);

    const config = Base64.decode(props.match.params.config);
    try {
      store.config = JSON.parse(config);
    } catch (error) {
      throw new CustomError(
        `Unable to decode URL configuration paramaters, ${config}`,
        error
      );
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
    if (!this.props.game || this.props.game.pictures.length === 0) {
      return (
        <div className={this.props.classes.progress}>
          <CircularProgress color="secondary" size={100} thickness={2} />
        </div>
      );
    }

    const { game: { pictures, pictureIndex } } = this.props;

    return (
      <div
        style={{ height: "100vh", width: "100vw", backgroundColor: "black" }}
      >
        <StatusPanel />
        <ActionPanel />
        <ImagePlayer url={pictures[pictureIndex]} />
      </div>
    );
  }
}

// <div style={{ display: 'absolute'}}>
// executing:{executing.toString()}
// <button onClick={this.handleInterruptTest}>InterruptTest</button>
// </div>
// {actionTriggers &&
// actionTriggers.map((trigger, index) => (
//   <button key={index} onClick={() => executeAction(trigger)}>
//     {trigger.label}
//   </button>
// ))}

export default withStyles(styles)(connect(GamePage));
