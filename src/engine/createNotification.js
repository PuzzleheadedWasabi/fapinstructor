import store from "store";
import play from "engine/audio";
import audioLibrary from "audio";

const createNotification = (title, { time, autoDismiss = true } = {}) => {
  play(audioLibrary.Card);
  return store.engine.notifications.push({
    title,
    time,
    autoDismiss
  });
};

export const dismissNotification = id => {
  store.engine.notifications[id - 1].expired = true;
};

export default createNotification;
