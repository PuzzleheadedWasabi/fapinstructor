import store from "store";
import play from "engine/audio";
import { getRandomAudioVariation } from "audio";
import remoteControl from "./remoteControl";
import { getRandomInclusiveInteger } from "utils/math";

let lastMoan = 0;
let moanDelay = 20;

export const moanRemoteControl = Object.create(remoteControl);

const moanLoop = progress => {
  if (!moanRemoteControl.paused) {
    if (store.config.enableMoans) {
      if (lastMoan > moanDelay * 1000) {
        play(getRandomAudioVariation("Moan"));
        lastMoan = 0;
        moanDelay = getRandomInclusiveInteger(5, 40);
      } else {
        lastMoan += progress;
      }
    }
  }
};

moanLoop.onSubscribe = () => {
  lastMoan = 0;
  moanDelay = 20;
};

export default moanLoop;
