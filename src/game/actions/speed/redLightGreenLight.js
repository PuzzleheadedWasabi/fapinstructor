import store from "store";
import {
  setStrokeSpeed,
  randomStrokeSpeed,
  getAverageStrokeSpeed
} from "game/utils/strokeSpeed";
import createNotification, {
  dismissNotification
} from "engine/createNotification";
import delay from "utils/delay";
import { getRandomInclusiveInteger, getRandomArbitrary } from "utils/math";
import play from "engine/audio";
import audioLibrary from "audio";

const redLightGreenLight = async () => {
  const { config: { fastestStrokeSpeed, enableVoice } } = store;

  const nid = createNotification(`Red Light/Green Light`, {
    autoDismiss: false
  });

  let timeLeft = getRandomInclusiveInteger(30, 60);
  let isGreen = false;

  if (enableVoice) {
    play(audioLibrary.Obey);
  }

  while (timeLeft > 0) {
    if (isGreen) {
      const fastSpeed = getRandomArbitrary(
        getAverageStrokeSpeed(),
        fastestStrokeSpeed
      );

      setStrokeSpeed(fastSpeed);
      createNotification(`Green!`);
      isGreen = false;
    } else {
      setStrokeSpeed(0);
      createNotification(`Red!`);
      isGreen = true;
    }
    const delayedTime = getRandomInclusiveInteger(2, 10);
    timeLeft = timeLeft - delayedTime;

    await delay(delayedTime * 1000);
  }

  dismissNotification(nid);
  setStrokeSpeed(randomStrokeSpeed());
};
redLightGreenLight.label = "Red Light/Green Light";

export default redLightGreenLight;
