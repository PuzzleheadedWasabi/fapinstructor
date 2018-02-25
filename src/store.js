import watch from "./watch";

let subscriberCount = 0;
const subscribers = {};

/**
 * Observe for any changes in the store
 */
const subscribe = callback => {
  if (typeof callback !== "function") {
    console.error("subscribe expected a function, received", callback);
  }
  subscribers[subscriberCount++] = callback;
  return subscriberCount;
};

/**
 * Stop observing for change in the store
 */
const unsubscribe = id => {
  delete subscribers[id];
};

/**
 * Create the applications store with the initialState
 */
const createStore = initialState =>
  watch(initialState, () => {
    Object.keys(subscribers).forEach(subscriberKey => {
      subscribers[subscriberKey]();
    });
  });

export { createStore, subscribe, unsubscribe };
