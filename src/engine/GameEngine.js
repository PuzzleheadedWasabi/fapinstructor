import GameLoop from "./GameLoop";
import executeAction from "./executeAction";
import actions from "../actions";
import play from "./AudioEngine";
import audioLibrary from "../audio";
import store from "../store";

const actionPlayer = progress => {
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

class GameEngine {
  constructor() {
    this.loop = new GameLoop();
    this.loop.start();
    this.subscriberId = null;
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
