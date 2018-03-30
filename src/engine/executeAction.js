import store from "store";
import interrupt from "./interrupt";

store.engine = {
  actionTriggers: null,
  executing: false
};

/**
 * Executes the specified action
 *
 * +----------------------------------+
 * |      Supports the following      |
 * +----------------------------------+
 * | -action executed immediately     |
 * | -action is executed on trigger   |
 * | -execution completes instantly   |
 * | -execution completes overtime    |
 * | -actions can be interrupted      |
 * +----------------------------------+
 * @param {A function that returns null or a promise} action
 * @param {If an action is already executing, should it be interrupted} shouldInterrupt
 */
const executeAction = (action, shouldInterrupt) => {
  const { engine } = store;

  if (typeof action !== "function") {
    throw new Error(`action is not a function, ${action}`);
  }

  if (shouldInterrupt) {
    interrupt();
  }

  engine.actionTriggers = null;
  engine.executing = true;

  return action()
    .then(trigger => {
      if (trigger) {
        if (Array.isArray(trigger)) {
          engine.actionTriggers = trigger;
        } else {
          engine.actionTriggers = Array.of(trigger);
        }
      }
      engine.executing = false;
    })
    .catch(e => {});
};

export default executeAction;
