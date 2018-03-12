import actionIterator from "engine/actionIterator";
import { getRandomInclusiveInteger } from "utils/math";
import createProbability from "../utils/createProbability";
import doubleStrokes from "./speed/doubleStrokes";
import halvedStrokes from "./speed/halvedStrokes";
import randomBeat from "./speed/randomBeat";
import randomGripAdjustment from "./grip";
import { addRubberBand, removeRubberBand } from "./cbt/rubberband";
import { addClothespin, removeClothespin } from "./cbt/clothespin";
import {
  setStrokeStyleDominant,
  setStrokeStyleNondominant,
  setStrokeStyleHeadOnly,
  setStrokeStyleShaftOnly,
  setStrokeStyleOverhandGrip
} from "./strokeStyle";
import eatPrecum from "./cei/eatPrecum";
import { insertButtPlug, removeButtPlug } from "./anal/buttPlug";

const actions = [
  // speed
  createProbability(halvedStrokes, 2),
  createProbability(doubleStrokes, 2),
  createProbability(randomBeat, 15),
  //createCommand(COMMANDS.SPEED.RANDOM_SPEED, actions.playSpeedCard, 8),
  //createCommand(COMMANDS.SPEED.INCREASE_SPEED_VARIANCE, actions.increaseSpeedVariance, 17)
  //ACCELERATION_CYCLES
  //SLOW_THEN_FAST
  //TRIPLETS
  // cbt
  createProbability(randomGripAdjustment, 15),
  createProbability(addRubberBand, 3),
  createProbability(removeRubberBand, 1),
  createProbability(addClothespin, 3),
  createProbability(removeClothespin, 1),
  // createCommand(COMMANDS.CBT.BALL_SLAPS, actions.ballSlaps, 4),
  // createCommand(COMMANDS.CBT.HEAD_PALMING, actions.headPalming, 1),
  // createCommand(COMMANDS.CBT.ICYHOT, actions.applyIcyHot, 1)
  // stroke style
  createProbability(setStrokeStyleDominant, 5),
  createProbability(setStrokeStyleNondominant, 5),
  createProbability(setStrokeStyleHeadOnly, 1),
  createProbability(setStrokeStyleShaftOnly, 2),
  createProbability(setStrokeStyleOverhandGrip, 2),
  // anal
  createProbability(insertButtPlug, 1),
  createProbability(removeButtPlug, 0.5),
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
