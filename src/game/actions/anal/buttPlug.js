import store from "store";
import createNotification, {
  dismissNotification
} from "engine/createNotification";
import { strokerRemoteControl } from "game/loops/strokerLoop";

export const insertButtPlug = async () => {
  if (!store.game.buttPlugInserted) {
    strokerRemoteControl.pause();

    const notificationId = createNotification("Slowly insert a butt plug", {
      autoDismiss: false
    });

    const done = async () => {
      strokerRemoteControl.play();
      store.game.buttPlugInserted = true;
      dismissNotification(notificationId);
    };
    done.label = "Inserted";

    return [done];
  }
};

export const removeButtPlug = async () => {
  if (store.game.buttPlugInserted) {
    strokerRemoteControl.pause();

    const notificationId = createNotification("Slowly remove the butt plug", {
      autoDismiss: false
    });

    const done = async () => {
      strokerRemoteControl.play();
      store.game.buttPlugInserted = false;
      dismissNotification(notificationId);
    };
    done.label = "Removed";

    return [done];
  }
};
