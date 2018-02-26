import store from "../../store";
import play from "../../engine/audio";
import audioLibrary from "../../audio";

let lastTick = 0;

export default progress => {
  const { strokeSpeed } = store;

  if (strokeSpeed > 0) {
    if (lastTick > 1 / strokeSpeed * 1000) {
      play(audioLibrary.Tick);

      if (this.soundPlayed) {
        this.soundPlayed();
      }
      lastTick = 0;
    } else {
      lastTick += progress;
    }
  }
};
