import store from "store";
import { setStrokeSpeed } from "game/utils/strokeSpeed";

const doubleStrokes = async () => {
  setStrokeSpeed(store.game.strokeSpeed * 2);
  store.engine.notifications.push({
    title: "Double Strokes!"
  });
};

export default doubleStrokes;
