import createNotification, {
  dismissNotification
} from "engine/createNotification";
import { strokerRemoteControl } from "game/loops/strokerLoop";

const applyToothpaste = async () => {
  strokerRemoteControl.pause();
  const notificationId = createNotification(
    "Apply a dime sized spot of toothpaste to the head of your cock",
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
applyToothpaste.label = "Apply Toothpaste";

export default applyToothpaste;
