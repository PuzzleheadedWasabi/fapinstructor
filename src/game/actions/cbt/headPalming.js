import store from "store";
import createNotification from "engine/createNotification";
import {
  setStrokeSpeed,
  randomStrokeSpeed,
  getAverageStrokeSpeed
} from "game/utils/strokeSpeed";
import { getRandomInclusiveInteger, getRandomArbitrary } from "utils/math";
import delay from "utils/delay";

const headPalming = async () => {
  const palmCircleCount = getRandomInclusiveInteger(5, 20);
  const delayTime = 2;
  const palmSpeed = getRandomArbitrary(
    store.config.slowestStrokeSpeed,
    getAverageStrokeSpeed()
  );
  const palmTime = palmCircleCount / palmSpeed;
  const totalTime = palmTime + delayTime;

  createNotification(
    `Palm the head of your cock.  One full circle for each beat.`,
    {
      time: totalTime * 1000
    }
  );

  setStrokeSpeed(0);
  await delay(delayTime * 1000);

  setStrokeSpeed(palmSpeed);
  await delay(palmTime * 1000);

  setStrokeSpeed(0);
  await delay(delayTime * 1000);

  createNotification(`Back to stroking`);

  setStrokeSpeed(randomStrokeSpeed());
};
headPalming.label = "Head Palming";

export default headPalming;
