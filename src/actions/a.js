import { interruptible } from "../engine/interrupt";
// import play from "../engine/AudioEngine";
// import audioLibrary from "../audio";

const a = async () => {
  const triggerA = async () => {
    console.log("trigger-a");
  };
  triggerA.label = "Trigger A";

  const triggerB = async () => {
    console.log("trigger-b");
  };
  triggerB.label = "Trigger B";

  console.log("new action - a");

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

export default a;
