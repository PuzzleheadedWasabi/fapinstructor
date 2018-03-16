import store from "store";
import elapsedGameTime from "game/utils/elapsedGameTime";
import doubleStrokes from "game/actions/speed/doubleStrokes";

const shouldEdge = () => {
  const {
    config: {
      minimumGameTime,
      maximumGameTime,
      actionFrequency,
      fastestStrokeSpeed
    },
    game: { strokeSpeed }
  } = store;

  let result = false;
  const isAllowedChance =
    elapsedGameTime("minutes") >= minimumGameTime * 1.2 &&
    strokeSpeed >= fastestStrokeSpeed / 1.7;

  if (isAllowedChance) {
    const rand = Math.random();
    const gameCompletionPercent =
      elapsedGameTime("seconds") / (maximumGameTime * 60);

    // Probability Graph: https://www.desmos.com/calculator/7ppaz3wzas
    result = gameCompletionPercent ** 3 / actionFrequency > rand;
  }

  return result;
};

export default shouldEdge;
