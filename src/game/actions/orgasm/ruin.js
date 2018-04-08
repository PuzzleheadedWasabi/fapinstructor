import store from "store";
import createNotification, {
  dismissNotification
} from "engine/createNotification";
import { setStrokeSpeed, randomStrokeSpeed } from "game/utils/strokeSpeed";
import delay from "utils/delay";
import play from "engine/audio";
import audioLibrary from "audio";
import { strokerRemoteControl } from "game/loops/strokerLoop";
import elapsedGameTime from "game/utils/elapsedGameTime";

export const shouldRuin = () => {
  const {
    game: { ruins, strokeSpeed },
    config: {
      maximumRuinedOrgasms,
      minimumGameTime,
      maximumGameTime,
      actionFrequency,
      fastestStrokeSpeed
    }
  } = store;

  let result = false;
  const isAllowedChance =
    ruins <= maximumRuinedOrgasms &&
    elapsedGameTime("minutes") >= minimumGameTime * 1.3 &&
    strokeSpeed >= fastestStrokeSpeed / 1.7;

  if (isAllowedChance) {
    const rand = Math.random();
    const gameCompletionPercent =
      elapsedGameTime("seconds") / (maximumGameTime * 60);

    if (elapsedGameTime("minutes") >= maximumGameTime) {
      // If the game time has gone over return true
      result = true;
    } else {
      // Probability Graph: https://www.desmos.com/calculator/xhyaj1gxuc
      result = gameCompletionPercent ** 4 / actionFrequency > rand;
    }
  }

  return result;
};

export const ruinedOrgasm = async () => {
  store.game.ruins++;
  store.game.activeVideo = null;

  if (store.config.enableVoice) {
    play(audioLibrary.Ruined);
  }

  const { config: { ruinCooldown } } = store;

  strokerRemoteControl.pause();

  await delay(ruinCooldown * 1000);

  setStrokeSpeed(randomStrokeSpeed());
  strokerRemoteControl.play();
  createNotification("Start stroking again");

  if (store.config.enableVoice) {
    play(audioLibrary.StartStrokingAgain);
  }

  await delay(3000);
};

const ruinOrgasm = async () => {
  const { config: { fastestStrokeSpeed } } = store;
  const notificationId = createNotification("Ruin it");

  if (store.config.enableVoice) {
    play(audioLibrary.RuinItForMe);
  }

  setStrokeSpeed(fastestStrokeSpeed);

  const trigger = async () => {
    dismissNotification(notificationId);
    await ruinedOrgasm();
  };
  trigger.label = "Ruined";

  return [trigger];
};

export default ruinOrgasm;
