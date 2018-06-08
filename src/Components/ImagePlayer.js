import React from "react";
import PropTypes from "prop-types";
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  player: {
    width: "100%",
    height: "99%",
    backgroundSize: "contain",
    backgroundPosition: "top center",
    backgroundRepeat: "no-repeat"
  }
})

const ImagePlayer = ({ classes, url }) => (
  <video
    className={classes.player}

    // <source src="https://giant.gfycat.com/GratefulForkedEuropeanfiresalamander.webm" type="video/webm">

    src={url}


    style={{
      pointerEvents: `none`
    }}

    // controls
    autoPlay
    name="media"
  />

);

ImagePlayer.propTypes = {
  url: PropTypes.string.isRequired
};

export default withStyles(styles)(ImagePlayer);
