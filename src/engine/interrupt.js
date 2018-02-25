let interruptibles = [];

const interruptible = id => {
  interruptibles.push(id);
};

// not really required unless a interruptable wants to become uninterruptable during execution
// const removeInterruptible = id => {
//   delete interruptibles[id - 1];
// };

const interrupt = () => {
  interruptibles.forEach(id => {
    // works for both timeout and intervals
    clearTimeout(id);
  });
  interruptibles = [];
};

export { interruptible };
export default interrupt;
