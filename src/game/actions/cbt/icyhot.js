import createNotification, {
  dismissNotification
} from "engine/createNotification";
import { strokerRemoteControl } from "game/loops/strokerLoop";

const applyIcyHot = async () => {
  strokerRemoteControl.pause();
  const notificationId = createNotification(
    "Apply a dime sized spot of icyhot to your cock",
    {
      autoDismiss: false
    }
  );

  const done = async () => {
    strokerRemoteControl.play();
    dismissNotification(notificationId);
  };
  done.label = "Applied";

  return [done];
};

export default applyIcyHot;
