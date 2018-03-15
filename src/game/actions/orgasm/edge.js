import store from "store";
import play from "engine/audio";
import audioLibrary from "audio";
import { setStrokeSpeed, randomStrokeSpeed } from "game/utils/strokeSpeed";
import { setDefaultGrip } from "game/actions/grip";
import { setStrokeStyleDominant } from "game/actions/strokeStyle";
import createNotification, {
  dismissNotification
} from "engine/createNotification";
import { getRandomBoolean, getRandomInclusiveInteger } from "utils/math";
import delay from "utils/delay";
import { strokerRemoteControl } from "game/loops/strokerLoop";

export const rideTheEdge = async (time = getRandomInclusiveInteger(5, 30)) => {
  setStrokeSpeed(0);
  const notificationId = createNotification("Ride the edge", {
    autoDismiss: false
  });
  play(audioLibrary.KeepStroking);

  await delay(time * 1000);
  dismissNotification(notificationId);
};

export const edging = notificationId => async () => {
  const { config: { edgeCooldown } } = store;

  dismissNotification(notificationId);
  store.game.edges++;

  const holdit = getRandomBoolean();
  if (holdit) {
    await rideTheEdge();
  }

  createNotification("Let go of your cock");
  strokerRemoteControl.pause();

  await delay(edgeCooldown * 1000);

  strokerRemoteControl.play();

  play(audioLibrary.StartStrokingAgain);
  createNotification("Start stroking again");
  randomStrokeSpeed();
};
edging.label = "Edging";

const edge = async () => {
  const { config: { fastestStrokeSpeed } } = store;
  play(audioLibrary.Edge);
  setStrokeSpeed(fastestStrokeSpeed);

  setDefaultGrip();
  setStrokeStyleDominant();

  const notificationId = createNotification("Get to the edge for me", {
    autoDismiss: false
  });

  const trigger = edging(notificationId);
  trigger.label = "Edging";
  return [trigger];
};

export default edge;
