import createNotification, {
  dismissNotification
} from "engine/createNotification";
import { strokerRemoteControl } from "game/loops/strokerLoop";

const eatPrecum = async () => {
  strokerRemoteControl.pause();
  const notificationId = createNotification(
    "Squeeze your cock and eat up all of your precum",
    {
      autoDismiss: false
    }
  );

  const done = async () => {
    strokerRemoteControl.play();
    dismissNotification(notificationId);
  };
  done.label = "Swallowed";

  return [done];
};

export default eatPrecum;
