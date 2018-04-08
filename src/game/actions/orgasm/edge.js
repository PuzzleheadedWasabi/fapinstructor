import store from "store";
import play from "engine/audio";
import audioLibrary from "audio";
import elapsedGameTime from "game/utils/elapsedGameTime";
import { setStrokeSpeed, randomStrokeSpeed } from "game/utils/strokeSpeed";
import { setDefaultGrip } from "game/actions/grip";
import { setStrokeStyleDominant } from "game/actions/strokeStyle";
import createNotification, {
  dismissNotification
} from "engine/createNotification";
import { getRandomBoolean, getRandomInclusiveInteger } from "utils/math";
import delay from "utils/delay";
import { strokerRemoteControl } from "game/loops/strokerLoop";

export const shouldEdge = () => {
  const {
    config: { minimumGameTime, maximumGameTime, actionFrequency }
  } = store;

  let result = false;
  const isAllowedChance = elapsedGameTime("minutes") >= minimumGameTime * 1.2;

  if (isAllowedChance) {
    const rand = Math.random();
    const gameCompletionPercent =
      elapsedGameTime("seconds") / (maximumGameTime * 60);

    // Probability Graph: https://www.desmos.com/calculator/6w5r74malh
    result = gameCompletionPercent ** 2 / actionFrequency > rand;
  }

  return result;
};

export const rideTheEdge = async (time = getRandomInclusiveInteger(5, 30)) => {
  setStrokeSpeed(0);
  const notificationId = createNotification("Ride the edge", {
    autoDismiss: false
  });

  if (store.config.enableVoice) {
    play(audioLibrary.KeepStroking);
  }

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

  if (store.config.enableVoice) {
    play(audioLibrary.StartStrokingAgain);
  }

  await delay(3000);
};

export const getToTheEdge = async () => {
  const { config: { fastestStrokeSpeed } } = store;

  if (store.config.enableVoice) {
    play(audioLibrary.Edge);
  }

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
