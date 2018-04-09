import store from "store";
import { setStrokeSpeed, randomStrokeSpeed } from "game/utils/strokeSpeed";
import createNotification, {
  dismissNotification
} from "engine/createNotification";
import delay from "utils/delay";
import play from "engine/audio";
import audioLibrary from "audio";

const acceleration = async () => {
  const { config: { slowestStrokeSpeed, fastestStrokeSpeed } } = store;

  const nid = createNotification(`Acceleration Strokes`, {
    autoDismiss: false
  });

  setStrokeSpeed(slowestStrokeSpeed);

  let audioPlayed = false;

  while (store.game.strokeSpeed < fastestStrokeSpeed) {
    setStrokeSpeed(store.game.strokeSpeed * 1.05);
    await delay(1000);

    if (!audioPlayed && store.game.strokeSpeed > fastestStrokeSpeed / 3) {
      play(audioLibrary.LongMoan);
      audioPlayed = true;
    }
  }
  await delay(2 * 1000);

  dismissNotification(nid);
  setStrokeSpeed(randomStrokeSpeed());
  await delay(5 * 1000);
};
acceleration.label = "Acceleration Strokes";

export default acceleration;
