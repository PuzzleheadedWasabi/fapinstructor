import { getRandomActions } from "./generateAction";
import executeAction from "engine/executeAction";
import { getRandomInclusiveInteger } from "utils/math";
import createNotification, {
  dismissNotification
} from "engine/createNotification";

const pickYourPoison = async () => {
  const rand = getRandomInclusiveInteger(2, 4);
  const chosenActions = getRandomActions(rand);

  const nid = createNotification("Pick your poison", {
    autoDismiss: false
  });

  return chosenActions.map(action => {
    const trigger = async () => {
      dismissNotification(nid);
      await executeAction(action);
    };
    trigger.label = action.label;
    return trigger;
  });
};
pickYourPoison.label = "Pick your poision";

export default pickYourPoison;
