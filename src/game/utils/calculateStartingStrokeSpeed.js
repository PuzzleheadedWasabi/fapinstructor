import store from "store";
import { clamp, getRandomArbitrary } from "utils/math";

/**
 * Calculates the starting stroke speed for a new game
 * We use the slowest & fastest stroke speeds, reduce the fastest
 * and increase the slowest, ensure it stays in the allowed
 * config range and then randomize it
 */
export default () => {
  const { slowestStrokeSpeed, fastestStrokeSpeed } = store.config;

  const minStrokeSpeed = clamp(
    slowestStrokeSpeed * 2,
    slowestStrokeSpeed,
    fastestStrokeSpeed
  );
  const maxStrokeSpeed = clamp(
    fastestStrokeSpeed / 1.4,
    slowestStrokeSpeed,
    fastestStrokeSpeed
  );
  const strokeSpeed = getRandomArbitrary(minStrokeSpeed, maxStrokeSpeed);

  return strokeSpeed;
};
