import store from "store";
import { interruptible } from "engine/interrupt";
import createNotification from "engine/createNotification";
import { setStrokeSpeed } from "game/utils/strokeSpeed";
import { strokerRemoteControl } from "game/loops/strokerLoop";

const randomBeat = async () => {
  createNotification("Random Beat");
  strokerRemoteControl.pause();

  await new Promise(resolve => {
    interruptible(
      setTimeout(() => {
        resolve();
      }, 5000)
    );
  });

  strokerRemoteControl.play();
};

export default randomBeat;
