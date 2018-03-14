import store from "store";
import elapsedGameTime from "game/utils/elapsedGameTime";

const shouldOrgasm = () => {
  const {
    game: { ruins, edges, probability },
    config: { minimumRuinedOrgasms, minimumEdges, minimumGameTime }
  } = store;

  const rand = Math.random();

  return (
    minimumRuinedOrgasms <= ruins &&
    minimumEdges <= edges &&
    elapsedGameTime() >= minimumGameTime &&
    rand <= probability ** 9
  );
};

export default shouldOrgasm;
