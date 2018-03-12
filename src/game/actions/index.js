import actionIterator from "engine/actionIterator";
import { getRandomInclusiveInteger } from "utils/math";
import createProbability from "../utils/createProbability";
import doubleStrokes from "./speed/doubleStrokes";
import halvedStrokes from "./speed/halvedStrokes";
import randomBeat from "./speed/randomBeat";
import randomGripAdjustment from "./grip";
import { addRubberBand, removeRubberBand } from "./cbt/rubberband";
import {
  setStrokeStyleDominant,
  setStrokeStyleNondominant,
  setStrokeStyleHeadOnly,
  setStrokeStyleShaftOnly,
  setStrokeStyleOverhandGrip
} from "./strokeStyle";
import eatPrecum from "./cei/eatPrecum";

const actions = [
  // speed
  createProbability(halvedStrokes, 2),
  createProbability(doubleStrokes, 2),
  createProbability(randomBeat, 30),
  // cbt
  createProbability(randomGripAdjustment, 15),
  createProbability(addRubberBand, 3),
  createProbability(removeRubberBand, 1),
  // stroke style
  createProbability(setStrokeStyleDominant, 5),
  createProbability(setStrokeStyleNondominant, 5),
  createProbability(setStrokeStyleHeadOnly, 1),
  createProbability(setStrokeStyleShaftOnly, 2),
  createProbability(setStrokeStyleOverhandGrip, 2),
  // anal
  // cei
  createProbability(eatPrecum, 3)
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
