import store from "store";
import { setStrokeSpeed } from "game/utils/strokeSpeed";
import createNotification from "engine/createNotification";

const halvedStrokes = async () => {
  setStrokeSpeed(store.game.strokeSpeed / 2);
  createNotification("Halved Strokes");
};
halvedStrokes.label = "Halved Strokes";

export default halvedStrokes;
