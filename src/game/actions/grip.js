import store from "store";
import createNotification from "engine/createNotification";
import { getRandomBoolean } from "utils/math";
import { GripStrengthEnum, GripStrengthString } from "game/enums/GripStrength";

export const setDefaultGrip = () => {
  const currentGrip = store.game.gripStrength;
  const defaultGrip = GripStrengthEnum.Normal;

  if (currentGrip !== defaultGrip) {
    store.game.gripStrength = defaultGrip;
    createNotification(
      `Change your grip to ${GripStrengthString[store.game.gripStrength]}`
    );
  }
}

export const tightenGrip = () => {
  const currentGrip = store.game.gripStrength;
  const tightestGrip = Object.keys(GripStrengthEnum).length - 1;

  if (currentGrip !== tightestGrip) {
    store.game.gripStrength = currentGrip + 1;
    createNotification(
      `Tighten your grip - ${GripStrengthString[store.game.gripStrength]}`
    );
  }
};

export const losenGrip = () => {
  const currentGrip = store.game.gripStrength;
  const lightestGrip = 0;

  if (currentGrip !== lightestGrip) {
    store.game.gripStrength = currentGrip - 1;
    createNotification(
      `Losen your grip - ${GripStrengthString[store.game.gripStrength]}`
    );
  }
};

const randomGripAdjustment = async () => {
  if (getRandomBoolean()) {
    tightenGrip();
  } else {
    losenGrip();
  }
};

export default randomGripAdjustment;
