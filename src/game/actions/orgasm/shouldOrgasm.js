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

  let isAllowedOrgasm = false;
  const isAllowedChance =
    minimumRuinedOrgasms <= ruins &&
    minimumEdges <= edges &&
    elapsedGameTime("minutes") >= minimumGameTime;

  if (isAllowedChance) {
    const rand = Math.random();
    const gameCompletionPercent =
      elapsedGameTime("seconds") / (maximumGameTime * 60);

    isAllowedOrgasm = gameCompletionPercent / actionFrequency > rand;
    isAllowedOrgasm = false;
  }

  return isAllowedOrgasm || elapsedGameTime("minutes") >= maximumGameTime;
};

export default shouldOrgasm;
