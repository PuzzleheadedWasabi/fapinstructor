import store from "store";
import createNotification from "engine/createNotification";
import { setStrokeSpeed, randomStrokeSpeed } from "game/utils/strokeSpeed";
import { getRandomInclusiveInteger } from "utils/math";
import delay from "utils/delay";
import play from "engine/audio";
import audioLibrary from "audio";

const squeezeBalls = async () => {
  const time = getRandomInclusiveInteger(5, 30);

  createNotification(`Squeeze your balls`, {
    time: time * 1000
  });

  if (store.config.enableVoice) {
    play(audioLibrary.SqueezeBalls);
  }

  setStrokeSpeed(randomStrokeSpeed());

  await delay(time * 1000);

  createNotification(`Back to stroking`);

  setStrokeSpeed(randomStrokeSpeed());
};
squeezeBalls.label = "Squeeze Balls";

export default squeezeBalls;
