/**
 * The entry point to kick start and configure the game
 */
import { subscribe, unsubscribe } from "engine/loop";
import actionLoop from "./loops/actionLoop";
import strokerLoop from "./loops/strokerLoop";
import probabilityLoop from "./loops/probabilityLoop";

let loops = [];

const addLoops = (...loops) => {
  loops.forEach(loop => {
    loops.push(subscribe(loop));
  })
}

const startGame = () => {
  addLoops(actionLoop, strokerLoop, probabilityLoop)
};

const stopGame = () => {
  loops.forEach(loop => {
    unsubscribe(loop);
  });
  loops = [];
};

export { startGame, stopGame };
