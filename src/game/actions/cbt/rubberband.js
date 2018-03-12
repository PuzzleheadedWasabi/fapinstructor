import store from "store";
import createNotification, {
  dismissNotification
} from "engine/createNotification";
import { getRandomBoolean } from "utils/math";
import { strokerRemoteControl } from "game/loops/strokerLoop";

export const addRubberBand = async () => {
  strokerRemoteControl.pause();
  const newRubberBands = store.game.rubberBands + 1;
  const notificationId = createNotification(`Add a rubberband`, {
    autoDismiss: false
  });

  const done = async () => {
    strokerRemoteControl.play();
    store.game.rubberBands = newRubberBands;
    dismissNotification(notificationId);
  };
  done.label = "Added";

  return [done];
};

export const removeRubberBand = async () => {
  strokerRemoteControl.pause();
  const currentRubberBands = store.game.rubberBands;

  if (currentRubberBands !== 0) {
    const newRubberBands = store.game.rubberBands + 1;
    const notificationId = createNotification(`Remove a rubberband`, {
      autoDismiss: false
    });

    const done = async () => {
      strokerRemoteControl.play();
      store.game.rubberBands = newRubberBands;
      dismissNotification(notificationId);
    };
    done.label = "Removed";

    return [done];
  }
};

const randomRubberBandAdjustment = async () => {
  if (getRandomBoolean()) {
    return addRubberBand();
  } else {
    return removeRubberBand();
  }
};

export default randomRubberBandAdjustment;
