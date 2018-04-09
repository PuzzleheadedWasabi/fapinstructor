import store from "store";
import createNotification from "engine/createNotification";
import { setStrokeSpeed, randomStrokeSpeed } from "game/utils/strokeSpeed";
import { getRandomInclusiveInteger } from "utils/math";
import delay from "utils/delay";
import play from "engine/audio";
import audioLibrary from "audio";

const ballslaps = async () => {
  const ballSlapCount = getRandomInclusiveInteger(3, 10);
  const delayTime = 2;
  const ballSlapSpeed = randomStrokeSpeed({ fast: 2 });
  const ballSlapTime = ballSlapCount / ballSlapSpeed;
  const totalTime = ballSlapTime + delayTime;

  createNotification(`Slap your balls ${ballSlapCount}`, {
    time: totalTime * 1000
  });

  if (store.config.enableVoice) {
    play(audioLibrary.SlapBalls);
  }

  setStrokeSpeed(0);
  await delay(delayTime * 1000);

  setStrokeSpeed(ballSlapSpeed);
  await delay(ballSlapTime * 1000);

  setStrokeSpeed(0);
  await delay(delayTime * 1000);

  createNotification(`Back to stroking`);

  setStrokeSpeed(randomStrokeSpeed());
};
ballslaps.label = "Ball slaps";

export default ballslaps;
