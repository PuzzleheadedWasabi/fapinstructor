import store from "store";
import { setStrokeSpeed } from "game/utils/strokeSpeed";
import createNotification from "engine/createNotification";

const doubleStrokes = async () => {
  setStrokeSpeed(store.game.strokeSpeed * 2);
  createNotification("Double Strokes");
};

export default doubleStrokes;
