import store from "store";
import elapsedGameTime from "game/utils/elapsedGameTime";

const shouldOrgasm = () => {
  const {
    game: { ruins, edges, probability },
    config: { minimumRuinedOrgasms, minimumEdges, minimumGameTime }
  } = store;

  const rand = Math.random();

  const result =
    minimumRuinedOrgasms <= ruins &&
    minimumEdges <= edges &&
    elapsedGameTime() >= minimumGameTime &&
    rand <= probability ** 9;

  if (result) {
    console.log({ rand, probability });
    console.log(rand <= probability ** 9);
    console.log("time", elapsedGameTime() >= minimumGameTime);
    debugger;
  }

  return result;
};

export default shouldOrgasm;
