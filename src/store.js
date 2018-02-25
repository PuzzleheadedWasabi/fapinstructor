import watch from "./watch";

const subscribers = [];

/**
 * Observe for any changes in the store
 */
const subscribe = callback => {
  if (typeof callback !== "function") {
    console.error("subscribe expected a function, received", callback);
  }
  return subscribers.push(callback);
};

/**
 * Stop observing for change in the store
 */
const unsubscribe = id => {
  delete subscribers[id - 1];
};

/**
 * Create the applications store with the initialState
 */
const createStore = initialState =>
  watch(initialState, () => {
    subscribers.forEach(callback => {
      callback();
    });
  });

export { createStore, subscribe, unsubscribe };
