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

const addLoops = (...newLoops) => {
  newLoops.forEach(loop => {
    loops.push(subscribe(loop));
  })
}

const startGame = () => {
  configureStore();
  addLoops(actionLoop, strokerLoop, probabilityLoop, slideLoop)
};

const stopGame = () => {
  loops.forEach(loop => {
    unsubscribe(loop);
  });
  loops = [];
};

export { startGame, stopGame };
