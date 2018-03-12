import actionIterator from "engine/actionIterator";
import { getRandomInclusiveInteger } from "utils/math";
import createProbability from "../utils/createProbability";
import doubleStrokes from "./doubleStrokes";
import halvedStrokes from "./halvedStrokes";
import randomBeat from "./randomBeat";
import randomGripAdjustment from "./grip"
import randomRubberBandAdjustment from "./cbt/rubberband";

const actions = [
  createProbability(halvedStrokes, 2),
  createProbability(doubleStrokes, 2),
  createProbability(randomBeat, 10),
  createProbability(randomGripAdjustment, 15),
  createProbability(randomRubberBandAdjustment, 100),
];

const generateAction = () => {
  const rand = getRandomInclusiveInteger(1, 100);

  // applies the probability to each action
  const chosenActions = actions.reduce((chosenActions, action) => {
    if (rand <= action.probability) {
      chosenActions.push(action.func);
    }
    return chosenActions;
  }, []);

  // get one of the chosen actions
  const action =
    chosenActions[getRandomInclusiveInteger(0, chosenActions.length - 1)];

  return action;
};

/**
 * Create an actionIterator using a action generator
 */
export default new actionIterator(generateAction);
