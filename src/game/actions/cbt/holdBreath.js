import createNotification from "engine/createNotification";
import { setStrokeSpeed, randomStrokeSpeed } from "game/utils/strokeSpeed";
import { getRandomInclusiveInteger } from "utils/math";
import delay from "utils/delay";

const holdBreath = async () => {
  const holdTime = getRandomInclusiveInteger(10, 60);

  createNotification(`Take a deep breath`);
  await delay(5 * 1000)

  createNotification(`Hold your breath`, {
    time: holdTime * 1000
  });
  await delay(holdTime * 1000);

  await delay(3 * 1000);
  createNotification(`Back to stroking`);

  setStrokeSpeed(randomStrokeSpeed());
};
holdBreath.label = "Hold Breath";

export default holdBreath;
