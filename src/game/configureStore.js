import store from "store";
import moment from "moment";

export default () => {
  store.game = {
    probability: 0,
    startTime: new moment(),
    shownSlides: 0,
    pictures: [],
    pictureIndex: -1
  }
}
