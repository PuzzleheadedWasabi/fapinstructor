import watchObject from "./utils/watchObject";

const store = {};
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
 * Wrap the store in an observable proxy
 */
const observableStore = watchObject(store, () => {
  subscribers.forEach(callback => {
    callback();
  });
});

export { subscribe, unsubscribe };
export default observableStore;
