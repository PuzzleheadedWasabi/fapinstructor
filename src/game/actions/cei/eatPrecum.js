import store from "store";
import createNotification, {
  dismissNotification
} from "engine/createNotification";
import { strokerRemoteControl } from "game/loops/strokerLoop";
import play from "engine/audio";
import { getRandomAudioVariation } from "audio";

const eatPrecum = async () => {
  strokerRemoteControl.pause();
  const notificationId = createNotification(
    "Squeeze your cock and eat up all of your precum",
    {
      autoDismiss: false
    }
  );

  if (store.config.enableVoice) {
    play(getRandomAudioVariation("CEI"));
  }

  const done = async () => {
    strokerRemoteControl.play();
    dismissNotification(notificationId);
  };
  done.label = "Swallowed";

  return [done];
};
eatPrecum.label = "Eat Precum";

export default eatPrecum;
