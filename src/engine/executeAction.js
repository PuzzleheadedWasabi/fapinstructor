/**
 * Executes the specified action
 *
 * Supports the following
 * ---------------------------------
 * - action executed immediately
 * - action is executed on trigger
 * - execution completes instantly
 * - execution completes overtime
 *
 * @param {A function that returns null or a promise} action
 */
const executeAction = action => {
  const { store } = window;

  if (typeof action !== "function") {
    console.error("executeAction", "action is not a function", action);
    return;
  }
  if (store.executing) {
    console.error(
      "executeAction",
      "cannot execute a new action when the previous one isn't complete",
      action
    );
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
