import store from "store";
import elapsedGameTime from "game/utils/elapsedGameTime";

export const allowedOrgasm = () => {
  const {
    game: { ruins, edges },
    config: { minimumRuinedOrgasms, minimumEdges, minimumGameTime }
  } = store;

  const isAllowedChance =
    minimumRuinedOrgasms <= ruins &&
    minimumEdges <= edges &&
    elapsedGameTime("minutes") >= minimumGameTime;

  return isAllowedChance;
};

export const shouldOrgasm = () => {
  const { config: { maximumGameTime, actionFrequency } } = store;

  let result = false;
  const isAllowedChance = allowedOrgasm();

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

  return result;
};

export default shouldOrgasm;
