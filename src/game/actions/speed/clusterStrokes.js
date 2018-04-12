import store from "store";
import createNotification from "engine/createNotification";
import {
  setStrokeSpeed,
  randomStrokeSpeed,
  getAverageStrokeSpeed
} from "game/utils/strokeSpeed";
import { getRandomInclusiveInteger } from "utils/math";
import delay from "utils/delay";

const clusterStrokes = async () => {
  const { config: { fastestStrokeSpeed } } = store;

  const sets = getRandomInclusiveInteger(3, 6);
  const reps = getRandomInclusiveInteger(3, 15);
  const averageSpeed = getAverageStrokeSpeed();

  // time to complete set
  const fastTime = reps / fastestStrokeSpeed;
  const averageTime = reps / averageSpeed;

  const startDelayTime = 2;
  const setGapTime = 0.25;
  const totalTime =
    fastTime * sets +
    averageTime * sets +
    setGapTime * sets +
    startDelayTime;

  createNotification(`Cluster Strokes, ${reps} in a row`, {
    time: totalTime * 1000
  });

  setStrokeSpeed(0);
  await delay(startDelayTime * 1000);

  setStrokeSpeed(averageSpeed);

  for (let i = 0; i < sets; i++) {
    setStrokeSpeed(fastestStrokeSpeed);
    await delay(fastTime * 1000);

    setStrokeSpeed(averageSpeed);
    await delay(averageTime * 1000);

    setStrokeSpeed(0);
    await delay(setGapTime * 1000);
  }

  setStrokeSpeed(randomStrokeSpeed());
};
clusterStrokes.label = "Cluster Strokes";

export default clusterStrokes;
