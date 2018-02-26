import { interruptible } from "engine/interrupt";
// import play from "engine/audio";
// import audioLibrary from "../audio";

const a = async () => {
  console.log("new action - a");

  const triggerA = async () => {
    console.log("trigger-a");
  };
  triggerA.label = "Trigger A";

  const triggerB = async () => {
    console.log("trigger-b");
  };
  triggerB.label = "Trigger B";

  await new Promise(resolve => {
    interruptible(
      setTimeout(() => {
        console.log("delayed execute");
        // play(audioLibrary.Ruined)
        resolve();
      }, 2000)
    );
  });

  console.log('waiting for trigger to execute')
  return [triggerA, triggerB];
};
a.label = "Task A";

export default a;
