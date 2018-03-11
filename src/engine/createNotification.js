import store from "store";
import play from "engine/audio";
import audioLibrary from "audio";

const createNotification = (title, time) => {
  play(audioLibrary.Card);
  store.engine.notifications.push({
    title,
    time
  });
};

export default createNotification;
