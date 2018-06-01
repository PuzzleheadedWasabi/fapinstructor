import store from "store";
import { setStrokeSpeed, randomStrokeSpeed } from "game/utils/strokeSpeed";
import createNotification from "engine/createNotification";
import { getRandomInclusiveInteger } from "utils/math";
import delay from "utils/delay";

const teasingStrokes = async () => {
  setStrokeSpeed(store.config.slowestStrokeSpeed);

  let totalTime = getRandomInclusiveInteger(15, 40);

  createNotification(`Teasing Strokes`, {
    time: totalTime * 1000
  });

  await delay(totalTime * 1000);

  setStrokeSpeed(randomStrokeSpeed());
};
teasingStrokes.label = "Teasing Strokes";

export default teasingStrokes;
