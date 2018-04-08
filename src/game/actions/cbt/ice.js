import createNotification, {
  dismissNotification
} from "engine/createNotification";
import { strokerRemoteControl } from "game/loops/strokerLoop";
import { getRandomInclusiveInteger } from "utils/math";
import delay from "utils/delay";

export const rubIceOnBalls = async () => {
  const time = getRandomInclusiveInteger(10, 50);

  const nid = createNotification(`Grab an ice cube`, {
    autoDismiss: false
  });

  strokerRemoteControl.pause();

  const done = async () => {
    dismissNotification(nid);

    createNotification(`Rub the ice cube against your balls`, {
      time: time * 1000
    });
    await delay(time * 1000);

    strokerRemoteControl.play();
    createNotification(`Back to stroking`);

    await delay(3 * 1000);
  };
  done.label = "Grabbed";

  return done;
};
rubIceOnBalls.label = "Iced Balls";
