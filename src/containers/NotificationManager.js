import React from "react";
import Notification from "components/Notification";
import store from "store";
import connect from "hoc/connect";

// add the notification system to the engine
store.engine.notifications = [];

class NotificationManager extends React.Component {
  handleDismiss = index => notification => {
    store.engine.notifications[index].expired = true;
  };

  render() {
    const { engine: { notifications } } = this.props;

    return (
      <div>
        {notifications.map(
          (notification, index) =>
            !notification.expired && (
              <Notification
                key={index}
                id={index}
                title={notification.title}
                time={notification.time}
                onDismiss={this.handleDismiss(index)}
              />
            )
        )}
      </div>
    );
  }
}

export default connect(NotificationManager);
