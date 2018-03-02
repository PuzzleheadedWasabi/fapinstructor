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

  const triggerC = async () => {
    console.log("trigger-c");
  };
  triggerC.label = "Trigger C";

  const triggerD = async () => {
    console.log("trigger-d");
  };
  triggerD.label = "Trigger D";

  const triggerE = async () => {
    console.log("trigger-e");
  };
  triggerE.label = "Trigger E";

  const triggerF = async () => {
    console.log("trigger-f");
  };
  triggerF.label = "Trigger F";

  const triggerG = async () => {
    console.log("trigger-g");
  };
  triggerG.label = "Trigger G";

  await new Promise(resolve => {
    interruptible(
      setTimeout(() => {
        console.log("delayed execute");
        // play(audioLibrary.Ruined)
        resolve();
      }, 2000)
    );
  });

  console.log("waiting for trigger to execute");
  return [triggerA, triggerB, triggerC, triggerD, triggerE, triggerF, triggerG];
};
a.label = "Task A";

export default a;
