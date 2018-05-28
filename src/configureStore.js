import store from "store";
import { GripStrengthEnum } from "game/enums/GripStrength";

const defaultConfig = {
  version: 2,
  tumblrId: "fapstergifs, allcowgirl, mar-cuss-blowjob-gifs",
  gifs: true,
  pictures: false,
  tumblrOffset: [],
  slideDuration: 10, // sec
  enableVoice: true,
  enableMoans: true,
  finalOrgasmAllowed: true,
  finalOrgasmDenied: false,
  finalOrgasmRuined: false,
  finalOrgasmRandom: false,
  minimumGameTime: 5, // min
  maximumGameTime: 20, // min
  minimumEdges: 0,
  minimumRuinedOrgasms: 0,
  maximumRuinedOrgasms: 0,
  maximumOrgasms: 1,
  postOrgasmTorture: true,
  postOrgasmTortureMinimumTime: 10,
  postOrgasmTortureMaximumTime: 90,
  edgeCooldown: 5, // sec
  ruinCooldown: 20, // sec
  slowestStrokeSpeed: 0.25, // sec
  fastestStrokeSpeed: 5, // sec
  initialGripStrength: GripStrengthEnum.Normal,
  actionFrequency: 5, // sec
  tasks: {
    doubleStrokes: true,
    halvedStrokes: true,
    accelerationCycles: true,
    randomBeat: true,
    randomStrokeSpeed: true,
    redLightGreenLight: true,
    clusterStrokes: true,
    dominant: true,
    nondominant: true,
    headOnly: true,
    shaftOnly: true,
    overhandGrip: true,
    gripAdjustments: true,
    bindCockBalls: true,
    rubberBands: true,
    clothespins: true,
    ballSlaps: true,
    squeezeBalls: true,
    headPalming: true,
    icyHot: true,
    toothpaste: true,
    breathPlay: true,
    scratching: true,
    flicking: true,
    cbtIce: true,
    precum: true,
    buttplug: true,
    pickYourPoison: true
  }
};

export default () => {
  store.config = defaultConfig;
  return store;
};
