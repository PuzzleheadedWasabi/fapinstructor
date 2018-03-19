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

const edge = async () => {
  const notificationId = await getToTheEdge();

  const trigger = edging(notificationId, 30).then(async () => {
    await handlEdgeEnd();
  });
  trigger.label = "Edging";
  return [trigger];
};

export const determineOrgasm = async () => {
  return [edge];
};

const doRuin = async () => {
  const { config: { fastestStrokeSpeed } } = store;

  setStrokeSpeed(fastestStrokeSpeed);
  play(audioLibrary.RuinItForMe);
  const nid = createNotification("Ruin it");

  const done = async () => {
    dismissNotification(nid);
    store.game.ruins++;
    end();
  };
  done.label = "Ruined";

  return [done];
};

const doOrgasm = async () => {
  const { config: { fastestStrokeSpeed } } = store;

  setStrokeSpeed(fastestStrokeSpeed);
  play(audioLibrary.Cum);
  const nid = createNotification("You have permission to have a full orgasm");

  const done = async () => {
    dismissNotification(nid);
    end();
  };
  done.label = "Orgasmed";

  return [done];
};

const doDenied = async () => {
  const { config: { fastestStrokeSpeed } } = store;

  setStrokeSpeed(fastestStrokeSpeed);
  play(audioLibrary.Cum);
  const nid = createNotification("Denied an orgasm");

  const done = async () => {
    dismissNotification(nid);
    end();
  };
  done.label = "Denied";

  return [done];
};

export const handlEdgeEnd = async () => {
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

  return [trigger, skip];
};

const skip = async () => {
  setStrokeSpeed(randomStrokeSpeed());

  // extend the game by 20%
  store.config.maximumGameTime *= 1.2;
};
skip.label = "Skip & Add Time";

const end = async () => {
  strokerRemoteControl.pause();

  const { maximumOrgasms } = store.config;
  store.game.orgasms++;

  // should continue?
  if (store.game.orgasms <= maximumOrgasms) {
    setStrokeSpeed(randomStrokeSpeed());
    strokerRemoteControl.play();
    createNotification("Start stroking again");
    play(audioLibrary.StartStrokingAgain);

    await delay(3000);
  }
};
