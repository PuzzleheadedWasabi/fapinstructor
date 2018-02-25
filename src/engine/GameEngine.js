import GameLoop from "./GameLoop";
import executeAction from "./executeAction";
import actions from "../actions";
import { loadFiles } from "../audio";
// import playAudioFile from "./playAudioFile";

class GameEngine {
  constructor() {
    this.loop = new GameLoop();
    this.loop.start();
    this.subscriberId = null;
    this.audioFiles = null;
  }

  start() {
    loadFiles().then(audioFiles => {
      this.audioFiles = audioFiles;
    });
    this.subscriberId = this.loop.subscribe(this.run);
  }

  stop() {
    this.loop.unsubscribe(this.subscriberId);
  }

  run = progress => {
    this.update(progress);
  };

  update(progress) {
    const { store } = window;

    // Don't execute new actions if a command is already executing or if any triggers are awaiting
    if (!store.executing && !store.actionTriggers) {
      const { value: action, done } = actions.next();

      if (!done) {
        executeAction(action);
      }
    }
  }
}

export default GameEngine;
