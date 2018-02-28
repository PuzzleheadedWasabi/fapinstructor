import store from "store";
import elapsedGameTime from "../utils/elapsedGameTime";

let lastProbabilityUpdate = 0;
export default progress => {
  // increase the probability every 10 seconds to avoid too many rerenders
  if (lastProbabilityUpdate >= 10000) {
    increaseProbability();
    lastProbabilityUpdate = 0;
  } else {
    lastProbabilityUpdate += progress;
  }
};


const increaseProbability = () => {
  const { config: { maximumGameTime } } = store;
  store.game.probability = (elapsedGameTime("seconds") / (maximumGameTime * 60)) * 100
}
