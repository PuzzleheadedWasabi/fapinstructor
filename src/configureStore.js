import store from "store";
import { GripStrengthEnum } from "game/enums/GripStrength";

const defaultConfig = {
  version: 2.0,
  tumblrId: "fapstergifs",
  gifs: true,
  pictures: false,
  tumblrOffset: 0,
  slideDuration: 10, // sec
  enableVoice: true,
  finalOrgasmAllowed: true,
  finalOrgasmDenied: false,
  finalOrgasmRuined: false,
  finalOrgasmRandom: false,
  minimumGameTime: 5, // min
  maximumGameTime: 20, // min
  minimumEdges: 3,
  minimumRuinedOrgasms: 0,
  maximumRuinedOrgasms: 0,
  ruinedOrgasmProbability: 50, // %
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
    slowAndFast: true,
    clusterStrokes: true,
    handSwapping: true,
    headOnly: true,
    shaftOnly: true,
    overhandGrip: true,
    gripAdjustments: true,
    bindCockBalls: true,
    rubberBands: true,
    clothespins: true,
    ballBeats: true,
    headPalming: true,
    icyHot: true,
    precum: true,
    buttplug: true
  }
};

export default () => {
  store.config = defaultConfig;
  return store;
};
