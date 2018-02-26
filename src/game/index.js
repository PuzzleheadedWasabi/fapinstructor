/**
 * The entry point to kick start and configure the game
 */
import { subscribe, unsubscribe } from "../engine/loop";
import actionLoop from "./loops/actionLoop";
import strokerLoop from "./loops/strokerLoop";

let loops = [];

const startGame = () => {
  loops.push(subscribe(actionLoop));
  loops.push(subscribe(strokerLoop));
};

const stopGame = () => {
  loops.forEach(loop => {
    unsubscribe(loop);
  });
  loops = [];
};

export { startGame, stopGame };
