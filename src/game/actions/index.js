import createProbability from "../utils/createProbability";
import doubleStrokes from "./speed/doubleStrokes";
import halvedStrokes from "./speed/halvedStrokes";
import teasingStrokes from "./speed/teasingStrokes";
import randomStrokeSpeed from "./speed/randomStrokeSpeed";
import randomBeat from "./speed/randomBeat";
import redLightGreenLight from "./speed/redLightGreenLight";
import clusterStrokes from "./speed/clusterStrokes";
import randomGripAdjustment from "./grip";
import {
  addRubberBand,
  removeRubberBand,
  snapRubberBand
} from "./cbt/rubberband";
import { addClothespin, removeClothespin } from "./cbt/clothespin";
import applyIcyHot from "./cbt/icyhot";
import applyToothpaste from "./cbt/toothpaste";
import ballslaps from "./cbt/ballslaps";
import squeezeBalls from "./cbt/squeezeBalls";
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

const initializeActions = taskConfigs =>
  [
    // speed
    taskConfigs.halvedStrokes && createProbability(halvedStrokes, 5),
    taskConfigs.doubleStrokes && createProbability(doubleStrokes, 15),
    taskConfigs.teasingStrokes && createProbability(teasingStrokes, 10),
    taskConfigs.randomBeat && createProbability(randomBeat, 10),
    taskConfigs.randomStrokeSpeed && createProbability(randomStrokeSpeed, 20),
    taskConfigs.accelerationCycles && createProbability(acceleration, 10),
    taskConfigs.redLightGreenLight && createProbability(redLightGreenLight, 10),
    taskConfigs.clusterStrokes && createProbability(clusterStrokes, 10),
    // cbt
    taskConfigs.rubberBands && createProbability(addRubberBand, 3),
    taskConfigs.rubberBands && createProbability(removeRubberBand, 1),
    taskConfigs.clothespins && createProbability(addClothespin, 3),
    taskConfigs.clothespins && createProbability(removeClothespin, 1),
    taskConfigs.icyHot && createProbability(applyIcyHot, 1),
    taskConfigs.toothpaste && createProbability(applyToothpaste, 1),
    taskConfigs.ballSlaps && createProbability(ballslaps, 4),
    taskConfigs.squeezeBalls && createProbability(squeezeBalls, 4),
    taskConfigs.headPalming && createProbability(headPalming, 1),
    taskConfigs.bindCockBalls && createProbability(bindCockAndBalls, 1),
    taskConfigs.rubberBands && createProbability(snapRubberBand, 1),
    taskConfigs.breathPlay && createProbability(holdBreath, 1),
    taskConfigs.scratching && createProbability(scratchChest, 1),
    taskConfigs.scratching && createProbability(scratchThighs, 1),
    taskConfigs.scratching && createProbability(scratchShoulders, 1),
    taskConfigs.flicking && createProbability(flickCockHead, 1),
    taskConfigs.flicking && createProbability(flickNipples, 1),
    taskConfigs.cbtIce && createProbability(rubIceOnBalls, 1),
    // stroke style
    taskConfigs.gripAdjustments && createProbability(randomGripAdjustment, 20),
    taskConfigs.dominant && createProbability(setStrokeStyleDominant, 7),
    taskConfigs.nondominant && createProbability(setStrokeStyleNondominant, 5),
    taskConfigs.headOnly && createProbability(setStrokeStyleHeadOnly, 1),
    taskConfigs.shaftOnly && createProbability(setStrokeStyleShaftOnly, 5),
    taskConfigs.overhandGrip &&
      createProbability(setStrokeStyleOverhandGrip, 1),
    // anal
    taskConfigs.buttplug && createProbability(insertButtPlug, 1),
    taskConfigs.buttplug && createProbability(removeButtPlug, 1),
    // cei
    taskConfigs.precum && createProbability(eatPrecum, 3),
    // misc.
    taskConfigs.pickYourPoison && createProbability(pickYourPoison, 15)
  ].filter(action => action !== null);

export default initializeActions;
