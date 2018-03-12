import store from "store";
import createNotification, {
  dismissNotification
} from "engine/createNotification";
import { strokerRemoteControl } from "game/loops/strokerLoop";

export const addClothespin = async () => {
  strokerRemoteControl.pause();
  if (store.game.clothespins < 2) {
    const clothespins = store.game.clothespins + 1;
    const notificationId = createNotification(
      `Attach a clothespin to a free nipple`,
      {
        autoDismiss: false
      }
    );

    const done = async () => {
      strokerRemoteControl.play();
      store.game.clothespins = clothespins;
      dismissNotification(notificationId);
    };
    done.label = "Attached";

    return [done];
  }
};

export const removeClothespin = async () => {
  strokerRemoteControl.pause();
  if (store.game.clothespins !== 0) {
    const clothespins = store.game.clothespins - 1;
    const notificationId = createNotification(`Remove a clothespin`, {
      autoDismiss: false
    });

    const done = async () => {
      strokerRemoteControl.play();
      store.game.clothespins = clothespins;
      dismissNotification(notificationId);
    };
    done.label = "Removed";

    return [done];
  }
};
