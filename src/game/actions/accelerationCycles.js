import store from "store";
import { interruptible } from "engine/interrupt";
import createNotification from "engine/createNotification";
import { setStrokeSpeed } from "game/utils/strokeSpeed";

const accelerationCycles = async () => {
  createNotification("Acceleration Cycles!");

  await new Promise(resolve => {
    interruptible(
      setTimeout(() => {
        console.log("delayed execute");
        // play(audioLibrary.Ruined)
        resolve();
      }, 2000)
    );
  });
};

export default accelerationCycles;
