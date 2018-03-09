import React from "react";
import PropTypes from "prop-types";
import Typography from "material-ui/Typography";
import { CircularProgress } from "material-ui/Progress";
import { withStyles } from "material-ui/styles";
import Slide from "material-ui/transitions/Slide";

const styles = theme => ({
  notification: {
    padding: "14px 24px",
    minWidth: "20vw",
    color: "white",
    borderRadius: "4px 4px 4px 4px",
    background: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    marginRight: 5,
    cursor: "pointer",
    userSelect: "none",
    overflow: "hidden"
  }
});

class Notification extends React.Component {
  state = {
    progress: 0
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      const progress = this.state.progress + 1;

      if (progress > 100) {
        clearInterval(this.interval);
        this.props.onDismiss(this.props.id);
      } else {
        this.setState({ progress });
      }
    }, 50);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { classes, id, title, onDismiss } = this.props;
    const { progress } = this.state;

    return (
      <Slide in={true} direction="right">
        <div key={id} className={classes.notification} onClick={onDismiss}>
          <Typography variant="body2" color="inherit" noWrap>
            {title + id}
          </Typography>
          <CircularProgress
            style={{ marginLeft: 10 }}
            variant="determinate"
            value={progress}
            color="secondary"
            size={20}
          />
        </div>
      </Slide>
    );
  }
}

Notification.propTypes = {
  title: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired
};

export default withStyles(styles)(Notification);
