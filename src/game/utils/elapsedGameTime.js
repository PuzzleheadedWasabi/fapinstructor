import store from "store";
import moment from "moment";

export default (unit) => moment().diff(store.game.startTime, unit);
