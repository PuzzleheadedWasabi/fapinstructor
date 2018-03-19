import store from "store";
import moment from "moment";
import { randomStrokeSpeed } from "./utils/strokeSpeed";
import { StrokeStyleEnum } from "game/enums/StrokeStyle";

export default () => {
  store.game = {
    startTime: new moment(),
    shownSlides: 0,
    pictures: [],
    pictureIndex: -1,
    strokeSpeed: randomStrokeSpeed(),
    gripStrength: store.config.initialGripStrength,
    rubberBands: 0,
    clothespins: 0,
    ruins: 0,
    edges: 0,
    orgasms: 0,
    strokeStyle: StrokeStyleEnum.Dominant,
    buttPlugInserted: false
  };
};
