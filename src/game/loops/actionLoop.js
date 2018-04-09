import store from "store";
import generateAction from "../actions/generateAction";
import executeAction from "engine/executeAction";

let lastGeneratedAction = 0;

const actionLoop = progress => {
  const { actionFrequency } = store.config;

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
  lastGeneratedAction = 0;
};

export default actionLoop;
