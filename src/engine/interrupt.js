import { dismissAllNotifications } from "engine/createNotification"

let interruptibles = [];

const interruptible = (id, reject) => {
  interruptibles.push({ id, reject });
};

const interrupt = () => {
  interruptibles.forEach(({ id, reject }) => {
    // works for both timeout and intervals
    clearTimeout(id);
    reject();
  });
  dismissAllNotifications();
  interruptibles = [];
};

export { interruptible };
export default interrupt;
