import store from "store";
import { GripStrengthEnum } from "game/enums/GripStrength";

const defaultConfig = {
  tumblrId: "fapstergifs",
  gifs: true,
  pictures: false,
  tumblrOffset: 0,
  slideDuration: 10, // sec
  disableVoice: false,
  finalOrgasmAllowed: true,
  finalOrgasmDenied: false,
  finalOrgasmRuined: false,
  finalOrgasmRandom: false,
  minimumGameTime: 5, // min
  maximumGameTime: 20, // min
  minimumEdges: 0,
  minimumRuinedOrgasms: 0,
  maximumRuinedOrgasms: 0,
  ruinedOrgasmProbability: 50, // %
  edgeCooldown: 5, // sec
  slowestStrokeSpeed: 0.25, // sec
  fastestStrokeSpeed: 5, // sec
  initialGripStrength: GripStrengthEnum.Normal,
  tasks: {
    doubleStrokes: true,
    halfStrokes: true,
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
