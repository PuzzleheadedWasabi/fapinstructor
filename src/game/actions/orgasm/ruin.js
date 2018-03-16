import store from "store";
import createNotification, {
  dismissNotification
} from "engine/createNotification";
import { setStrokeSpeed, randomStrokeSpeed } from "game/utils/strokeSpeed";
import delay from "utils/delay";
import play from "engine/audio";
import audioLibrary from "audio";
import { strokerRemoteControl } from "game/loops/strokerLoop";

export const ruinedOrgasm = notificationId => async () => {
  if (notificationId) {
    dismissNotification(notificationId);
  }
  store.game.ruins++;
  play(audioLibrary.Ruined);
  const { config: { ruinCooldown } } = store;

  strokerRemoteControl.pause();

  await delay(ruinCooldown * 1000);

  setStrokeSpeed(randomStrokeSpeed());
  strokerRemoteControl.play();
  createNotification("Start stroking again");
  play(audioLibrary.StartStrokingAgain);

  await delay(3000);
};

const ruinOrgasm = async () => {
  const { config: { fastestStrokeSpeed } } = store;
  const notificationId = createNotification("Ruin it");
  play(audioLibrary.RuinItForMe);
  setStrokeSpeed(fastestStrokeSpeed);

  const trigger = ruinedOrgasm(notificationId);
  trigger.label = "Ruined";

  return [trigger];
};

export default ruinOrgasm;
