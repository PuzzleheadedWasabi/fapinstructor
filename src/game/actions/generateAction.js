import store from "store";
import actionIterator from "engine/actionIterator";
import { getRandomInclusiveInteger } from "utils/math";
import initializeActions from "./index";
import edge, { shouldEdge } from "./orgasm/edge";
import ruin, { shouldRuin } from "./orgasm/ruin";
import orgasm, { shouldOrgasm } from "./orgasm/orgasm";
import _ from "lodash";

export const getRandomActions = (count = 0) => {
  const actions = initializeActions(store.config.tasks);

  // applies the probability to each action
  let chosenActions = [];
  do {
    chosenActions = chosenActions.concat(
      actions.reduce((accumulator, action) => {
        const rand = getRandomInclusiveInteger(1, 100);
        if (rand <= action.probability) {
          accumulator.push(action.func);
        }
        return accumulator;
      }, [])
    );
  } while (chosenActions.length < count);

  chosenActions = _.shuffle(chosenActions);

  if (count) {
    chosenActions = count > 0 ? chosenActions.slice(0, count) : chosenActions;
  }

  return chosenActions;
};

const generateAction = () => {
  let action = null;

  if (shouldOrgasm()) {
    action = orgasm;
  } else if (shouldEdge()) {
    action = edge;
  } else if (shouldRuin()) {
    action = ruin;
  } else {
    const chosenActions = getRandomActions();

    // get one of the chosen actions
    action =
      chosenActions[getRandomInclusiveInteger(0, chosenActions.length - 1)];
  }

  return action;
};

/**
 * Create an actionIterator using a action generator
 */
export default new actionIterator(generateAction);
