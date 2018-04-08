import createProbability from "../utils/createProbability";
import doubleStrokes from "./speed/doubleStrokes";
import halvedStrokes from "./speed/halvedStrokes";
import randomStrokeSpeed from "./speed/randomStrokeSpeed";
import randomBeat from "./speed/randomBeat";
import redLightGreenLight from "./speed/redLightGreenLight";
import randomGripAdjustment from "./grip";
import {
  addRubberBand,
  removeRubberBand,
  snapRubberBand
} from "./cbt/rubberband";
import { addClothespin, removeClothespin } from "./cbt/clothespin";
import applyIcyHot from "./cbt/icyhot";
import applyToothpaste from "./cbt/applyToothpaste";
import ballslaps from "./cbt/ballslaps";
import headPalming from "./cbt/headPalming";
import bindCockAndBalls from "./cbt/bindCockAndBalls";
import holdBreath from "./cbt/holdBreath";
import {
  scratchChest,
  scratchThighs,
  scratchShoulders
} from "./cbt/scratching";
import { flickCockHead, flickNipples } from "./cbt/flicking";
import { rubIceOnBalls } from "./cbt/ice";
import {
  setStrokeStyleDominant,
  setStrokeStyleNondominant,
  setStrokeStyleHeadOnly,
  setStrokeStyleShaftOnly,
  setStrokeStyleOverhandGrip
} from "./strokeStyle";
import eatPrecum from "./cei/eatPrecum";
import { insertButtPlug, removeButtPlug } from "./anal/buttPlug";
import pickYourPoison from "./pickYourPoison";
import acceleration from "./speed/acceleration";

const actions = [
  // speed
  createProbability(halvedStrokes, 5),
  createProbability(doubleStrokes, 15),
  createProbability(randomBeat, 20),
  createProbability(randomStrokeSpeed, 20),
  createProbability(acceleration, 10),
  createProbability(redLightGreenLight, 10),
  // cbt
  createProbability(randomGripAdjustment, 20),
  createProbability(addRubberBand, 3),
  createProbability(removeRubberBand, 1),
  createProbability(addClothespin, 3),
  createProbability(removeClothespin, 1),
  createProbability(applyIcyHot, 1),
  createProbability(applyToothpaste, 1),
  createProbability(ballslaps, 4),
  createProbability(headPalming, 1),
  createProbability(bindCockAndBalls, 1),
  createProbability(snapRubberBand, 1),
  createProbability(holdBreath, 1),
  createProbability(scratchChest, 1),
  createProbability(scratchThighs, 1),
  createProbability(scratchShoulders, 1),
  createProbability(flickCockHead, 1),
  createProbability(flickNipples, 1),
  createProbability(rubIceOnBalls, 1),
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
  createProbability(pickYourPoison, 15)
];

export default actions;
