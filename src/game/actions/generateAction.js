import actionIterator from "engine/actionIterator";
import { getRandomInclusiveInteger } from "utils/math";
import actions from "./index";
import edge, { shouldEdge } from "./orgasm/edge";
import ruin, { shouldRuin } from "./orgasm/ruin";
import orgasm, { shouldOrgasm } from "./orgasm/orgasm";
import pickYourPoison from "./pickYourPoison";

export const getRandomActions = count => {
  const rand = getRandomInclusiveInteger(1, 100);

  // applies the probability to each action
  let chosenActions = actions.reduce((chosenActions, action) => {
    if (rand <= action.probability) {
      chosenActions.push(action.func);
    }
    return chosenActions;
  }, []);

  if (chosenActions.length < count) {
    chosenActions = chosenActions.concat(getRandomActions(count));
  }

  if (count) {
    chosenActions = chosenActions.slice(0, count);
  }

  console.log(chosenActions)
  return chosenActions;
};

const generateAction = () => {
  let action = null;
  return pickYourPoison;
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
