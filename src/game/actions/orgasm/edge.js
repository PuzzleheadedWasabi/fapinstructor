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

export const edging = async time => {
  store.game.edges++;

  const holdIt = getRandomBoolean();

  if (holdIt || time) {
    await rideTheEdge(time);
  }
};

export const stopEdging = async () => {
  const { config: { edgeCooldown } } = store;

  createNotification("Let go of your cock");
  strokerRemoteControl.pause();

  await delay(edgeCooldown * 1000);

  strokerRemoteControl.play();

  setStrokeSpeed(randomStrokeSpeed());
  createNotification("Start stroking again");
  play(audioLibrary.StartStrokingAgain);

  await delay(3000);
};

export const getToTheEdge = async () => {
  const { config: { fastestStrokeSpeed } } = store;
  play(audioLibrary.Edge);
  setStrokeSpeed(fastestStrokeSpeed);

  setDefaultGrip();
  setStrokeStyleDominant();

  const notificationId = createNotification("Get to the edge for me", {
    autoDismiss: false
  });
  return notificationId;
};

const edge = async () => {
  const notificationId = await getToTheEdge();

  const trigger = async () => {
    dismissNotification(notificationId);
    await edging();
    await stopEdging();
  };
  trigger.label = "Edging";

  return [trigger];
};

export default edge;
