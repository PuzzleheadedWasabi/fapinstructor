import store from "store";
import play from "engine/audio";
import audioLibrary from "audio";

const createNotification = (title) => {
  play(audioLibrary.Card)
  store.engine.notifications.push({
    title
  });
}

export default createNotification;
