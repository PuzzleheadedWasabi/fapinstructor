import GameLoop from "./GameLoop";
import executeAction from "./executeAction";
import actions from "../actions";
import { loadFiles } from "../audio";
import playAudioFile from "./playAudioFile";

const actionPlayer = progress => {
  const { store } = window;

  // Don't execute new actions if a command is already executing or if any triggers are awaiting
  if (!store.executing && !store.actionTriggers) {
    const { value: action, done } = actions.next();

    if (!done) {
      executeAction(action);
    }
  }
};

let lastTick = 0;
const strokePlayer = progress => {
  const { store: { strokeSpeed } } = window;

  if (strokeSpeed > 0) {
    if (lastTick > 1 / strokeSpeed * 1000) {
      window.audio.play("tick");

      if (this.soundPlayed) {
        this.soundPlayed();
      }
      lastTick = 0;
    } else {
      lastTick += progress;
    }
  }
};

class GameEngine {
  constructor() {
    this.loop = new GameLoop();
    this.loop.start();
    this.subscriberId = null;

    loadFiles().then(audioFiles => {
      this.audioFiles = audioFiles;
    });
  }

  start() {
    this.subscriberId = this.loop.subscribe(this.run);
  }

  stop() {
    this.loop.unsubscribe(this.subscriberId);
  }

  run = progress => {
    this.update(progress);
  };

  update(progress) {
    actionPlayer(progress);
    strokePlayer(progress);
  }
}

export default GameEngine;
