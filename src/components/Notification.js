import React from "react";
import PropTypes from "prop-types";
import Typography from "material-ui/Typography";
import { LinearProgress } from "material-ui/Progress";
import { withStyles } from "material-ui/styles";
import Slide from "material-ui/transitions/Slide";
import Icon from "material-ui-icons/Grade";

const styles = theme => ({
  root: {
    background: "rgba(0, 0, 0, 0.8)",
    margin: 5,
    border: "1px solid #222",
    borderTop: 0
  },
  notification: {
    padding: "14px 24px",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    userSelect: "none",
    overflow: "hidden"
  },
  icon: {
    marginRight: 5
  },
  progress: {
    height: 1,
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

        setTimeout(() => {
          this.props.onDismiss(this.props.id);
        }, 500);
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
        <div className={classes.root}>
          <LinearProgress
            variant="determinate"
            value={progress}
            className={classes.progress}
            color="secondary"
          />
          <div key={id} className={classes.notification} onClick={onDismiss}>
            <Icon className={classes.icon} />
            <Typography variant="body2" color="inherit" noWrap>
              {title}
            </Typography>
          </div>
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
