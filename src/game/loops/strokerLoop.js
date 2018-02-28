import store from "store";
import play from "engine/audio";
import audioLibrary from "audio";

let lastStroke = 0;

export default progress => {
  const { strokeSpeed } = store;

  if (strokeSpeed > 0) {
    if (lastStroke > 1 / strokeSpeed * 1000) {
      playStroke();
      lastStroke = 0;
    } else {
      lastStroke += progress;
    }
  }
};

const playStroke = () => {
  play(audioLibrary.Tick);
  if (this.soundPlayed) {
    this.soundPlayed();
  }
}
