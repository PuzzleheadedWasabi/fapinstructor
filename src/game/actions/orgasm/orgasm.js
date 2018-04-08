import store from "store";
import createNotification, {
  dismissNotification
} from "engine/createNotification";
import { setStrokeSpeed, randomStrokeSpeed } from "game/utils/strokeSpeed";
import delay from "utils/delay";
import play from "engine/audio";
import audioLibrary from "audio";
import { strokerRemoteControl } from "game/loops/strokerLoop";
import { getToTheEdge, edging } from "./edge";
import { getRandomInclusiveInteger } from "utils/math";
import elapsedGameTime from "game/utils/elapsedGameTime";
import { stopGame } from "game";

export const allowedOrgasm = () => {
  const {
    game: { ruins, edges },
    config: { minimumRuinedOrgasms, minimumEdges, minimumGameTime }
  } = store;

  const isAllowedChance =
    minimumRuinedOrgasms <= ruins &&
    minimumEdges <= edges &&
    elapsedGameTime("minutes") >= minimumGameTime;

  return isAllowedChance;
};

export const shouldOrgasm = () => {
  const { config: { maximumGameTime, actionFrequency } } = store;

  let result = false;
  const isAllowedChance = allowedOrgasm();

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

export const doRuin = async () => {
  const { config: { fastestStrokeSpeed } } = store;

  setStrokeSpeed(fastestStrokeSpeed);

  if (store.config.enableVoice) {
    play(audioLibrary.RuinItForMe);
  }

  const nid = createNotification("Ruin it");

  const done = async () => {
    dismissNotification(nid);
    store.game.ruins++;
    end();
  };
  done.label = "Ruined";

  return done;
};

export const doOrgasm = async () => {
  const {
    config: {
      fastestStrokeSpeed,
      postOrgasmTorture,
      postOrgasmTortureMinimumTime,
      postOrgasmTortureMaximumTime
    }
  } = store;

  setStrokeSpeed(fastestStrokeSpeed);

  if (store.config.enableVoice) {
    play(audioLibrary.Cum);
  }

  const nid = createNotification("You have permission to have a full orgasm");

  const done = async () => {
    dismissNotification(nid);

    if (postOrgasmTorture) {
      const nid = createNotification("DO NOT STOP STROKING");
      await delay(
        getRandomInclusiveInteger(
          postOrgasmTortureMinimumTime,
          postOrgasmTortureMaximumTime
        ) * 1000
      );
      dismissNotification(nid);
    }
    end();
  };
  done.label = "Orgasmed";

  return done;
};

export const doDenied = async () => {
  const { config: { fastestStrokeSpeed } } = store;

  setStrokeSpeed(fastestStrokeSpeed);

  if (store.config.enableVoice) {
    play(audioLibrary.Denied);
  }

  const nid = createNotification("Denied an orgasm");

  const done = async () => {
    dismissNotification(nid);
    end();
  };
  done.label = "Denied";

  return done;
};

export const determineOrgasm = async () => {
  const {
    config: {
      finalOrgasmAllowed,
      finalOrgasmDenied,
      finalOrgasmRuined,
      finalOrgasmRandom
    }
  } = store;

  let trigger;

  if (finalOrgasmRandom) {
    let options = [];

    if (finalOrgasmAllowed) {
      options.push(doOrgasm);
    } else if (finalOrgasmDenied) {
      options.push(doDenied);
    } else if (finalOrgasmRuined) {
      options.push(doRuin);
    }
    trigger = options[getRandomInclusiveInteger(0, options.length - 1)];
  } else {
    if (finalOrgasmAllowed) {
      trigger = doOrgasm;
    } else if (finalOrgasmDenied) {
      trigger = doDenied;
    } else if (finalOrgasmRuined) {
      trigger = doRuin;
    }
  }

  return [await trigger(), skip];
};

export const skip = async () => {
  setStrokeSpeed(randomStrokeSpeed());

  // extend the game by 20%
  store.config.maximumGameTime *= 1.2;
};
skip.label = "Skip & Add Time";

export const end = async () => {
  const { maximumOrgasms } = store.config;
  strokerRemoteControl.pause();
  store.game.orgasms++;

  // should continue?
  if (store.game.orgasms < maximumOrgasms) {
    setStrokeSpeed(randomStrokeSpeed());
    strokerRemoteControl.play();
    createNotification("Start stroking again");
    play(audioLibrary.StartStrokingAgain);
    await delay(3000);
  } else {
    setStrokeSpeed(0);
    stopGame();
  }
};

const orgasm = async () => {
  const notificationId = await getToTheEdge();

  const trigger = async () => {
    dismissNotification(notificationId);
    await edging(30);
    return await determineOrgasm();
  };
  trigger.label = "Edging";

  return trigger;
};

export default orgasm;
