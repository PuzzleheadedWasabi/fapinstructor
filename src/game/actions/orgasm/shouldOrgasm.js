import store from "store";
import elapsedGameTime from "game/utils/elapsedGameTime";

const shouldOrgasm = () => {
  const {
    game: { ruins, edges },
    config: {
      minimumRuinedOrgasms,
      minimumEdges,
      minimumGameTime,
      maximumGameTime,
      actionFrequency
    }
  } = store;

  let result = false;
  const isAllowedChance =
    minimumRuinedOrgasms <= ruins &&
    minimumEdges <= edges &&
    elapsedGameTime("minutes") >= minimumGameTime;

  if (isAllowedChance) {
    const rand = Math.random();
    const gameCompletionPercent =
      elapsedGameTime("seconds") / (maximumGameTime * 60);

    // Probability Graph: https://www.desmos.com/calculator/xhyaj1gxuc
    result = gameCompletionPercent ** 4 / actionFrequency > rand;
  }

  // If the game time has overreached then always return true
  return result || elapsedGameTime("minutes") >= maximumGameTime;
};

export default shouldOrgasm;
