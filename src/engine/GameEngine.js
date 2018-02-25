import GameLoop from "./GameLoop";
import executeAction from "./executeAction"
import actions from "../actions/actions"
import a from "../actions/a"

class GameEngine {
  constructor() {
    this.loop = new GameLoop();
    this.loop.start();
    this.actions = new actions(this.generateAction);
  }

  start() {
    this.id = this.loop.subscribe(this.run);
  }

  stop() {
    this.loop.unsubscribe(this.id);
  }

  generateAction() {
    return a;
  }

  run = (progress) => {
    this.update(progress);
  }

  update(progress) {
    const { store } = window;

    // Don't execute new actions if a command is already executing or if any triggers are awaiting
    if (!store.executing && !store.actionTriggers) {
      const { value: action, done } = this.actions.next();

      if (!done) {
        executeAction(action);
      }
    }
  }
}

export default GameEngine;
