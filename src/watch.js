/**
 * Watches an object for changes, if any are detected it will trigger the callback
 */
export default (object, onChange) =>
  new Proxy(object, {
    get(target, key) {
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      onChange();
      return true;
    },
    deleteProperty(target, key) {
      if (key in target) {
        delete target[key];
        onChange();
      }
    }
  });
