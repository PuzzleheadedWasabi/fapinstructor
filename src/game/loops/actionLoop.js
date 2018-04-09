import store from "store";
import generateAction from "../actions/generateAction";
import executeAction from "engine/executeAction";
import play from "engine/audio";
import audioLibrary from "audio";

let lastGeneratedAction = -5000;
let playedStartAudio = false;

const actionLoop = progress => {
  const { actionFrequency, enableVoice } = store.config;

  if (enableVoice && !playedStartAudio) {
    playedStartAudio = true;
    play(audioLibrary.StartGame);
    play(audioLibrary.CardShuffle);
  }

  if (lastGeneratedAction >= actionFrequency * 1000) {
    const { executing, actionTriggers } = store.engine;

    // Don't execute new actions if a command is already executing or if any triggers are awaiting
    if (!executing && !actionTriggers) {
      const action = generateAction.next();

      if (action && action.value && !action.done) {
        executeAction(action.value);
      }
    }
    lastGeneratedAction = 0;
  } else {
    lastGeneratedAction += progress;
  }
};

actionLoop.onSubscribe = () => {
  lastGeneratedAction = -5000;
  playedStartAudio = false;
};

export default actionLoop;
