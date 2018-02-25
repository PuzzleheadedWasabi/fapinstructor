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
    setTimeout(() => {
      console.log("delayed execute resolved");
      resolve();
    }, 1000);
  });
  console.log("after delayed execute");
  return [triggerA, triggerB];
};

export default a;
