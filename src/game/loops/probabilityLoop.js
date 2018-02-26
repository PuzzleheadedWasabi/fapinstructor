import actions from "../actions";
import store from "store";
import executeAction from "engine/executeAction";

let lastProbabilityUpdate = 0;

const increaseProbability = () => {
  const { probability, config: { maxTime } } = getState();
  store.probability = (store.probability + 1 / maxTime)
}

export default progress => {
  if (store.probability) {
    // increase the probability every minute
    if (lastProbabilityUpdate >= 60000) {
      props.increaseProbability();
      lastProbabilityUpdate = 0;
    } else {
      lastProbabilityUpdate += progress;
    }
  }
};



