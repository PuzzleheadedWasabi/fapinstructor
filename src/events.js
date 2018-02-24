// action executed immediately
// action is executed on trigger
// execution completes instantly
// execution completes overtime

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
    }, 5000);
  });
  console.log("after delayed execute");
  return [triggerA, triggerB];
};

let actionTriggers = null;
let executing = false;

/**
 * Executes the specified action
 * @param {A function that returns null or a promise} action
 */
const execute = action => {
  if (typeof action !== "function") {
    console.error(`execute(); action is not a function`, action);
    return;
  }

  actionTriggers = null;
  executing = true;
  return action().then(trigger => {
    if (trigger) {
      if (Array.isArray(trigger)) {
        actionTriggers = trigger;
      } else {
        actionTriggers = Array.of(trigger);
      }
    }
    executing = false;
  });
};

const actions = [a, a];

/**
 * A generator that returns the next available action
*/
function* getActions() {
  let index = 0;
  for (let i = 0; i < actions.length; i++) {
    yield actions[i];
  }
}

const actionGenerator = getActions();

// Game Loop
const interval = setInterval(() => {
  // Don't execute new actions if a command is already executing or if any triggers are awaiting
  if (!executing && !actionTriggers) {
    const { value: action, done } = actionGenerator.next();

    if (done) {
      // All actions have been used up, the game is finished.
      clearInterval(interval);
    } else {
      execute(action);
    }
  }
}, 1000);

// user triggers
setInterval(() => {
  if (!executing) {
    if (actionTriggers) {
      actionTriggers.forEach(trigger => {
        console.log(trigger.label);
      });

      execute(actionTriggers[0]);
    }
  }
}, 1000);
