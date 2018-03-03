let interruptibles = [];

const interruptible = id => {
  interruptibles.push(id);
};

// Makes an interruptable action into an uninterruptable action
const removeInterruptible = id => {
  delete interruptibles[id - 1];
};

const interrupt = () => {
  interruptibles.forEach(id => {
    // works for both timeout and intervals
    clearTimeout(id);
  });
  interruptibles = [];
};

export { interruptible, removeInterruptible };
export default interrupt;
