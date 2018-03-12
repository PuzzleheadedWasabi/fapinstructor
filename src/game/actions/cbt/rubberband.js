import store from "store";
import createNotification, {
  dismissNotification
} from "engine/createNotification";
import { getRandomBoolean } from "utils/math";

export const addRubberBand = async () => {
  const newRubberBands = store.game.rubberBands + 1;
  const notificationId = createNotification(`Add a rubberband`, {
    autoDismiss: false
  });

  const done = async () => {
    store.game.rubberBands = newRubberBands;
    dismissNotification(notificationId);
  };
  done.label = "Added";

  return [done];
};

export const removeRubberBand = async () => {
  const currentRubberBands = store.game.rubberBands;

  if (currentRubberBands !== 0) {
    const newRubberBands = store.game.rubberBands + 1;
    const notificationId = createNotification(`Remove a rubberband`, {
      autoDismiss: false
    });

    const done = async () => {
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
