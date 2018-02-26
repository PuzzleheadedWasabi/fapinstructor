import React from "react";
import PropTypes from "prop-types";
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  player: {
    width: "100%",
    height: "100%",
    backgroundSize: "contain",
    backgroundPosition: "top center",
    backgroundRepeat: "no-repeat"
  }
})

const ImagePlayer = ({ classes, url }) => (
  <div
    className={classes.player}
    style={{
      backgroundImage: `url(${url})`
    }}
  />
);

ImagePlayer.propTypes = {
  url: PropTypes.string.isRequired
};

export default withStyles(styles)(ImagePlayer);
