import store from "store";
import { clamp, getRandomArbitrary } from "utils/math";

/**
 * Generates a random stroke speed
 * We use the slowest & fastest stroke speeds, reduce the fastest
 * and increase the slowest, ensure it stays in the allowed
 * config range and then randomize it
 */
export const randomStrokeSpeed = ({ slow = 2, fast = 1.4 } = {}) => {
  const { slowestStrokeSpeed, fastestStrokeSpeed } = store.config;

  const minStrokeSpeed = clamp(
    slowestStrokeSpeed * slow,
    slowestStrokeSpeed,
    fastestStrokeSpeed
  );
  const maxStrokeSpeed = clamp(
    fastestStrokeSpeed / fast,
    slowestStrokeSpeed,
    fastestStrokeSpeed
  );
  const strokeSpeed = getRandomArbitrary(minStrokeSpeed, maxStrokeSpeed);

  return strokeSpeed;
};

export const setStrokeSpeed = newSpeed => {
  const { slowestStrokeSpeed, fastestStrokeSpeed } = store.config;

  let speed = 0;

  if (newSpeed > 0) {
    speed = clamp(newSpeed, slowestStrokeSpeed, fastestStrokeSpeed);
  }
  store.game.strokeSpeed = speed;
};
