import store from "store";
import play from "engine/audio";
import audioLibrary from "audio";
import remoteControl from "./remoteControl";

let lastStroke = 0;

export const strokerRemoteControl = Object.create(remoteControl);

export default progress => {
  if (!strokerRemoteControl.paused) {
    const { strokeSpeed } = store.game;

    if (strokeSpeed > 0) {
      if (lastStroke > 1 / strokeSpeed * 1000) {
        play(audioLibrary.Tick);
        lastStroke = 0;
      } else {
        lastStroke += progress;
      }
    }
  }
};
