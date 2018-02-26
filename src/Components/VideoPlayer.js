import React from "react";
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  player: {
    width: "99%",
    height: "99%"
  }
})

const VideoPlayer = ({ classes, url }) => (
  <iframe
    title="youtube"
    className={classes.player}
    src={`https://www.youtube-nocookie.com/embed/${url}?rel=0&amp;showinfo=0&autoplay=1`}
    frameBorder="0"
    allowFullScreen
  />
);

VideoPlayer.propTypes = {
  ur: PropTypes.string.isRequired
}

export default withStyles(styles)(VideoPlayer);
