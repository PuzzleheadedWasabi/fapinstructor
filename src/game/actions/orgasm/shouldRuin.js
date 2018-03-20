import store from "store";
import elapsedGameTime from "game/utils/elapsedGameTime";

const shouldRuin = () => {
  const {
    game: { ruins, strokeSpeed },
    config: {
      maximumRuinedOrgasms,
      minimumGameTime,
      maximumGameTime,
      actionFrequency,
      fastestStrokeSpeed
    }
  } = store;

  let result = false;
  const isAllowedChance =
    ruins <= maximumRuinedOrgasms &&
    elapsedGameTime("minutes") >= minimumGameTime * 1.3 &&
    strokeSpeed >= fastestStrokeSpeed / 1.7;

  if (isAllowedChance) {
    const rand = Math.random();
    const gameCompletionPercent =
      elapsedGameTime("seconds") / (maximumGameTime * 60);

    if (elapsedGameTime("minutes") >= maximumGameTime) {
      // If the game time has gone over return true
      result = true;
    } else {
      // Probability Graph: https://www.desmos.com/calculator/xhyaj1gxuc
      result = gameCompletionPercent ** 4 / actionFrequency > rand;
    }
  }

  console.log('shouldRuin', result)
  return result;
};

export default shouldRuin;
