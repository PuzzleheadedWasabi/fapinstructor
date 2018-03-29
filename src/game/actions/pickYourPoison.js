import { getRandomActions } from "./generateAction";
import executeAction from "engine/executeAction";
import createNotification, {
  dismissNotification
} from "engine/createNotification";

const pickYourPoison = async () => {
  const chosenActions = getRandomActions(5);

  const nid = createNotification("Pick your poison", {
    autoDismiss: false
  });

  return chosenActions.map(action => {
    const trigger = async () => {
      dismissNotification(nid);
      executeAction(action);
    };
    trigger.label = action.label;
    return trigger;
  });
};
pickYourPoison.label = "Pick your poision";

export default pickYourPoison;
