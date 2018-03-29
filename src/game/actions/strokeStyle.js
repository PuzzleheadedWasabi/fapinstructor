import store from "store";
import createNotification from "engine/createNotification";
import { StrokeStyleEnum } from "game/enums/StrokeStyle";

export const setStrokeStyleDominant = async () => {
  if (store.game.strokeStyle !== StrokeStyleEnum.Dominant) {
    createNotification(`Use your dominant hand`);
    store.game.strokeStyle = StrokeStyleEnum.Dominant;
  }
};
setStrokeStyleDominant.label = "Dominant Hand";

export const setStrokeStyleNondominant = async () => {
  if (store.game.strokeStyle !== StrokeStyleEnum.Nondominant) {
    createNotification(`Use your nondominant hand`);
    store.game.strokeStyle = StrokeStyleEnum.Nondominant;
  }
};
setStrokeStyleNondominant.label = "Nondominant Hand";

export const setStrokeStyleHeadOnly = async () => {
  if (store.game.strokeStyle !== StrokeStyleEnum.HeadOnly) {
    createNotification(`Stroke only the head`);
    store.game.strokeStyle = StrokeStyleEnum.HeadOnly;
  }
};
setStrokeStyleHeadOnly.label = "Head Stroking";

export const setStrokeStyleShaftOnly = async () => {
  if (store.game.strokeStyle !== StrokeStyleEnum.ShaftOnly) {
    createNotification(`Stroke only the shaft`);
    store.game.strokeStyle = StrokeStyleEnum.ShaftOnly;
  }
};
setStrokeStyleShaftOnly.label = "Shaft Stroking";

export const setStrokeStyleOverhandGrip = async () => {
  if (store.game.strokeStyle !== StrokeStyleEnum.OverhandGrip) {
    createNotification(`Stroke with the overhand grip`);
    store.game.strokeStyle = StrokeStyleEnum.OverhandGrip;
  }
};
setStrokeStyleOverhandGrip.label = "Overhand Grip"
