import {
  setStrokeSpeed,
  randomStrokeSpeed as randomStrokeSpeedUtil
} from "game/utils/strokeSpeed";
import createNotification from "engine/createNotification";
import { round } from "utils/math";

const randomStrokeSpeed = async () => {
  const speed = randomStrokeSpeedUtil({ slow: 0, fast: 0 });
  setStrokeSpeed(speed);
  createNotification(`Random Stroking Speed of ${round(speed, 2)}`);
};
randomStrokeSpeed.label = "Random Stroke Speed";

export default randomStrokeSpeed;
