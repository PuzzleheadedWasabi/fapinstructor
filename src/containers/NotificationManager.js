import React from "react";
import { withStyles } from "material-ui/styles";
import Notification from "components/Notification";
import store from "store";
import connect from "hoc/connect";

// add the notification system to the engine
store.engine.notifications = [];

const styles = theme => ({
  root: {
    pointerEvents: "auto"
  }
});

class NotificationManager extends React.Component {
  handleDismiss = index => notification => {
    store.engine.notifications[index].expired = true;
  };

  render() {
    const { classes, engine: { notifications } } = this.props;

    return (
      <div className={classes.root}>
        {notifications.map(
          (notification, index) =>
            !notification.expired && (
              <Notification
                key={index}
                id={index}
                title={notification.title}
                time={notification.time}
                autoDismiss={notification.autoDismiss}
                onDismiss={this.handleDismiss(index)}
              />
            )
        )}
      </div>
    );
  }
}

export default withStyles(styles)(connect(NotificationManager));
