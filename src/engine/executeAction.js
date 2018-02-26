import store from "store";
import interrupt from "./interrupt";

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
  if (typeof action !== "function") {
    throw new Error(`action is not a function, ${action}`);
  }
  if (store.executing) {
    if (!shouldInterrupt) {
      throw new Error(
        `cannot execute a new action when the previous one isn't complete, ${action}`
      );
    }
    interrupt();
  }

  store.actionTriggers = null;
  store.executing = true;

  return action().then(trigger => {
    if (trigger) {
      if (Array.isArray(trigger)) {
        store.actionTriggers = trigger;
      } else {
        store.actionTriggers = Array.of(trigger);
      }
    }
    store.executing = false;
  });
};

export default executeAction;
