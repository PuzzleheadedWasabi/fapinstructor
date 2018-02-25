import { interruptible } from "../engine/interrupt";

const a = async () => {
  const triggerA = async () => {
    console.log("promise-trigger-a");
  };
  triggerA.label = "Trigger A";

  const triggerB = async () => {
    console.log("promise-trigger-b");
  };
  triggerB.label = "Trigger B";

  console.log("promise-a");

  await new Promise(resolve => {
    interruptible(
      setTimeout(() => {
        console.log("delayed execute");
        resolve();
      }, 5000)
    );
  });
  return [triggerA, triggerB];
};

export default a;
