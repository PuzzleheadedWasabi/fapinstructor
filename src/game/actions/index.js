import createProbability from "../utils/createProbability";
import doubleStrokes from "./speed/doubleStrokes";
import halvedStrokes from "./speed/halvedStrokes";
import randomStrokeSpeed from "./speed/randomStrokeSpeed";
import randomBeat from "./speed/randomBeat";
import randomGripAdjustment from "./grip";
import { addRubberBand, removeRubberBand } from "./cbt/rubberband";
import { addClothespin, removeClothespin } from "./cbt/clothespin";
import applyIcyHot from "./cbt/icyhot";
import ballslaps from "./cbt/ballslaps";
import {
  setStrokeStyleDominant,
  setStrokeStyleNondominant,
  setStrokeStyleHeadOnly,
  setStrokeStyleShaftOnly,
  setStrokeStyleOverhandGrip
} from "./strokeStyle";
import eatPrecum from "./cei/eatPrecum";
import { insertButtPlug, removeButtPlug } from "./anal/buttPlug";
import pickYourPoison from "./pickYourPoison"

const actions = [
  // speed
  createProbability(halvedStrokes, 5),
  createProbability(doubleStrokes, 15),
  createProbability(randomBeat, 15),
  createProbability(randomStrokeSpeed, 20),
  //ACCELERATION_CYCLES
  //SLOW_THEN_FAST
  //TRIPLETS
  // cbt
  createProbability(randomGripAdjustment, 20),
  createProbability(addRubberBand, 3),
  createProbability(removeRubberBand, 1),
  createProbability(addClothespin, 3),
  createProbability(removeClothespin, 1),
  createProbability(applyIcyHot, 1),
  createProbability(ballslaps, 4),
  // createCommand(COMMANDS.CBT.HEAD_PALMING, actions.headPalming, 1),
  // stroke style
  createProbability(setStrokeStyleDominant, 7),
  createProbability(setStrokeStyleNondominant, 5),
  createProbability(setStrokeStyleHeadOnly, 1),
  createProbability(setStrokeStyleShaftOnly, 5),
  createProbability(setStrokeStyleOverhandGrip, 1),
  // anal
  createProbability(insertButtPlug, 1),
  createProbability(removeButtPlug, 1),
  // cei
  createProbability(eatPrecum, 3),
  // misc.
  createProbability(pickYourPoison, 10)
];

export default actions;
