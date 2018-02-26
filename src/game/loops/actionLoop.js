import actions from "../actions";
import store from "store";
import executeAction from "engine/executeAction";

export default progress => {
  const { executing, actionTriggers } = store.engine;

  // Don't execute new actions if a command is already executing or if any triggers are awaiting
  if (!executing && !actionTriggers) {
    const { value: action, done } = actions.next();

    if (!done) {
      executeAction(action);
    }
  }
};
