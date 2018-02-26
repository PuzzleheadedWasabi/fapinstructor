/**
 * Watches an object for changes, if any are detected it will trigger the callback
 */
const watchObject = (object, onChange) =>
  new Proxy(object, {
    get(target, key) {
      return target[key];
    },
    set(target, key, value) {
      if (value && typeof value === "object") {
        target[key] = watchObject(value, onChange);
      } else {
        target[key] = value;
      }
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

export default watchObject;
