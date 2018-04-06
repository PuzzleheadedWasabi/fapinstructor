import React from "react";
import { Base64 } from "js-base64";
import { withStyles } from "material-ui/styles";
import connect from "hoc/connect";
import { startGame, stopGame } from "game";
import store from "store";
import CustomError from "utils/CustomError";
import ImagePlayer from "components/ImagePlayer";
import VideoPlayer from "components/VideoPlayer";
import { CircularProgress } from "material-ui/Progress";
import HUD from "containers/HUD";
import EndPage from "containers/Pages/EndPage";

const styles = theme => ({
  progress: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh"
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

  render() {
    if (!this.props.game || this.props.game.pictures.length === 0) {
      return (
        <div className={this.props.classes.progress}>
          <CircularProgress color="secondary" size={100} thickness={2} />
        </div>
      );
    }

    const {
      game: { orgasms, activeVideo, activePicture },
      config: { maximumOrgasms }
    } = this.props;

    return (
      <div style={{ height: "100vh", width: "100vw" }}>
        {maximumOrgasms === orgasms ? (
          <EndPage />
        ) : (
          [
            <HUD key="hud" />,
            activeVideo ? (
              <VideoPlayer key="videoplayer" video={activeVideo} />
            ) : (
              activePicture && (
                <ImagePlayer key="imageplayer" url={activePicture} />
              )
            )
          ]
        )}
      </div>
    );
  }
}

export default withStyles(styles)(connect(GamePage));
