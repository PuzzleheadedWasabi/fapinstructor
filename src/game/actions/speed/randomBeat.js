import store from "store";
import createNotification from "engine/createNotification";
import { setStrokeSpeed, randomStrokeSpeed } from "game/utils/strokeSpeed";
import { getRandomInclusiveInteger, getRandomArbitrary } from "utils/math";
import delay from "utils/delay";

const randomBeat = async () => {
  // set count
  const setCount = getRandomInclusiveInteger(5, 10);

  const averageSpeed =
    (store.config.fastestStrokeSpeed + store.config.slowestStrokeSpeed) / 2;

  // stroke speed of sets
  const fastSpeed = getRandomArbitrary(
    averageSpeed,
    store.config.fastestStrokeSpeed
  );
  const slowSpeed = getRandomArbitrary(
    store.config.slowestStrokeSpeed,
    averageSpeed
  );

  // rep count
  const fastReps = getRandomInclusiveInteger(3, 7);
  const slowReps = getRandomInclusiveInteger(1, 5);

  // time to complete set
  const fastTime = fastReps / fastSpeed;
  const slowTime = slowReps / slowSpeed;

  const startDelayTime = 2;
  const setGapTime = 0.25;
  const totalTime =
    fastTime * setCount +
    slowTime * setCount +
    setGapTime * setCount +
    startDelayTime;

  createNotification(`Random Beat [${fastReps}, ${slowReps}]`, {
    time: totalTime * 1000
  });

  setStrokeSpeed(0);
  await delay(startDelayTime * 1000);

  for (let i = 0; i < setCount; i++) {
    setStrokeSpeed(fastSpeed);
    await delay(fastTime * 1000);

    setStrokeSpeed(slowSpeed);
    await delay(slowTime * 1000);

    setStrokeSpeed(0);
    await delay(setGapTime * 1000);
  }

  setStrokeSpeed(randomStrokeSpeed());
};
randomBeat.label = "Random Beat";

export default randomBeat;
