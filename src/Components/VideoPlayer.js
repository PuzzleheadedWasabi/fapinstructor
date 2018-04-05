import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  player: {
    width: "99%",
    height: "99%"
  }
});

const VideoPlayer = ({ classes, video, autoPlay = 0 }) => (
  <iframe
    title="youtube"
    className={classes.player}
    src={`https://www.youtube-nocookie.com/embed/${video}?rel=0&amp;showinfo=0&autoplay=${autoPlay}`}
    frameBorder="0"
    allowFullScreen
  />
);

VideoPlayer.propTypes = {
  video: PropTypes.string.isRequired
};

export default withStyles(styles)(VideoPlayer);
