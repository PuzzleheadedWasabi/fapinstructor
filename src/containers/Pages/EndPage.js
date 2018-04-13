import React from "react";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Feedback from "components/Feedback";
import BackgroundImage from "images/background.jpg";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: `url(${BackgroundImage})`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed"
  }
});

const EndPage = ({ classes }) => (
  <div className={classes.root}>
    <Typography
      variant="display3"
      color="inherit"
      style={{ fontFamily: "'Damion', cursive" }}
    >
    The End
    </Typography>
    <Typography variant="body2" gutterBottom>
      I hope you have enjoyed the game. If you have any feedback or feature
      requests please let me know on reddit or open an issue on GitHub!
    </Typography>
    <Feedback />
  </div>
);

export default withStyles(styles)(EndPage);
