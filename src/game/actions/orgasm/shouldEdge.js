import store from "store";
import elapsedGameTime from "game/utils/elapsedGameTime";

const shouldEdge = () => {
  const {
    game: { probability, strokeSpeed },
    config: { fastestStrokeSpeed }
  } = store;

  const rand = Math.random();

  return (
    elapsedGameTime() > 4 &&
    rand <= probability &&
    strokeSpeed >= fastestStrokeSpeed / 1.3
  );
};

export default shouldEdge;
