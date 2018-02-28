/**
 * The entry point to kick start and configure the game
 */
import { subscribe, unsubscribe } from "engine/loop";
import configureStore from "./configureStore";
import actionLoop from "./loops/actionLoop";
import strokerLoop from "./loops/strokerLoop";
import probabilityLoop from "./loops/probabilityLoop";
import slideLoop from "./loops/slideLoop";

let loops = [];

const addLoops = (...loops) => {
  loops.forEach(loop => {
    loops.push(subscribe(loop));
  })
}

const startGame = () => {
  addLoops(actionLoop, strokerLoop, probabilityLoop, slideLoop)
  configureStore();
};

const stopGame = () => {
  loops.forEach(loop => {
    unsubscribe(loop);
  });
  loops = [];
};

export { startGame, stopGame };
