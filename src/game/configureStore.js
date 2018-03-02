import store from "store";
import moment from "moment";
import calculateStartingStrokeSpeed from "./utils/calculateStartingStrokeSpeed";

export default () => {
  store.game = {
    probability: 0,
    startTime: new moment(),
    shownSlides: 0,
    pictures: [],
    pictureIndex: -1,
    strokeSpeed: calculateStartingStrokeSpeed(),
    gripStrength: store.config.initialGripStrength
  };
};
