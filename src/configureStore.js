import store from "store";
import { GripStrengthEnum } from "game/enums/GripStrength"

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
};

export default () => {
  store.config = defaultConfig;
  return store;
}
