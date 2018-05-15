/**
 * The entry point to kick start and configure the game
 */
import { subscribe, unsubscribe } from "engine/loop";
import interrupt from "engine/interrupt";
import configureStore from "./configureStore";
import actionLoop from "./loops/actionLoop";
import strokerLoop from "./loops/strokerLoop";
import slideLoop from "./loops/slideLoop";
import moanLoop from "./loops/moanLoop";

let loops = [];

const addLoops = (...newLoops) => {
  newLoops.forEach(loop => {
    loops.push(subscribe(loop));
  });
};

const startGame = () => {
  configureStore();
  addLoops(actionLoop, strokerLoop, slideLoop, moanLoop);
};

const stopGame = () => {
  interrupt();
  loops.forEach(loop => {
    unsubscribe(loop);
  });
  loops = [];
};

export { startGame, stopGame };
