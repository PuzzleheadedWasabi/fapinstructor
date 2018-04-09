import store from "store";
import { setStrokeSpeed, randomStrokeSpeed } from "game/utils/strokeSpeed";
import createNotification from "engine/createNotification";
import { getRandomInclusiveInteger } from "utils/math";
import delay from "utils/delay";
import play from "engine/audio";
import { getRandomAudioVariation } from "audio";

const doubleStrokes = async () => {
  setStrokeSpeed(store.game.strokeSpeed * 2);

  let totalTime = getRandomInclusiveInteger(5, 20);

  createNotification(`Double Strokes`, {
    time: totalTime * 1000
  });

  if (store.config.enableVoice) {
    play(getRandomAudioVariation("Faster"));
  }

  await delay(totalTime * 1000);

  setStrokeSpeed(randomStrokeSpeed());
};
doubleStrokes.label = "Double Strokes";

export default doubleStrokes;
