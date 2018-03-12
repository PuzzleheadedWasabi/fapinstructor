import store from "store";
import createNotification, {
  dismissNotification
} from "engine/createNotification";
import { getRandomBoolean, getRandomInclusiveInteger } from "utils/math";
import { strokerRemoteControl } from "game/loops/strokerLoop";

export const addRubberBand = async () => {
  strokerRemoteControl.pause();
  const newRubberBands = store.game.rubberBands + 1;

  let location = "Put a rubberband ";
  switch (getRandomInclusiveInteger(1, 4)) {
    case 1: {
      location += "onto the base of your shaft";
      break;
    }
    case 2: {
      location += "onto the middle of your shaft";
      break;
    }
    case 3: {
      location += "underneath your cock head";
      break;
    }
    default: {
      location += "anywhere on your cock";
    }
  }

  const notificationId = createNotification(location, {
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
    const newRubberBands = store.game.rubberBands - 1;
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
