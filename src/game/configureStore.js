import store from "store";
import moment from "moment";
import { randomStrokeSpeed } from "./utils/strokeSpeed";

export default () => {
  store.game = {
    probability: 0,
    startTime: new moment(),
    shownSlides: 0,
    pictures: [],
    pictureIndex: -1,
    strokeSpeed: randomStrokeSpeed(),
    gripStrength: store.config.initialGripStrength,
    rubberBands: 0
  };
};
