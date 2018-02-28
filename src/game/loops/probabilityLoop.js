import store from "store";
import moment from "moment";
import elapsedGameTime from "../utils/elapsedGameTime";

store.game = {
  probability: 0,
  startTime: new moment()
}

let lastUpdate = 0;
export default progress => {
  const { config: { maximumGameTime } } = store;

  // increase the probability every 10 seconds to avoid too many rerenders
  if (lastUpdate >= 10000) {
    store.game.probability = (elapsedGameTime("seconds") / (maximumGameTime * 60)) * 100
    lastUpdate = 0;
  } else {
    lastUpdate += progress;
  }
};
