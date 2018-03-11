import actions from "../actions";
import store from "store";
import executeAction from "engine/executeAction";

let lastGeneratedAction = 0;

export default progress => {
  if (lastGeneratedAction >= 2000) {
    const { executing, actionTriggers } = store.engine;
    // Don't execute new actions if a command is already executing or if any triggers are awaiting
    if (!executing && !actionTriggers) {
      const action = actions.next();

      if (action && action.value && !action.done) {
        executeAction(action.value);
      }
    }
    lastGeneratedAction = 0;
  } else {
    lastGeneratedAction += progress;
  }
};
