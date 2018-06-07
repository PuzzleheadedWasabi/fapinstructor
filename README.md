This project was created by TheFapInstructor

# Installing
```
npm install || yarn
npm start
```

## Adding a New Task
Below is a mini tutorial on how to add a new action called `testAction`.  This action will display a simple notification and will wait for the user to click the button labeled `Done` before dismissing it.

1. First we will create a new file called `testAction.js` and that will reside within the foloder `game/actions/`.  All actions are present within this folder, nested folders to organize actions types can be used.

2. Within this file we will place the following code.
```js
import createNotification, { dismissNotification } from "engine/createNotification";

// A promise must be returned in this case async for actions that need to 'wait' for user input
const testAction = async () => {
  // This code will be immediately executed when the action is used.
  const notificationId = createNotification(
    "Test Action",
    {
      autoDismiss: false
    }
  );

  // We create a response function that returns a promise to handle what happens after the user clicks the button
  const done = async () => {
    dismissNotification(notificationId);
  };
  // Make sure you attach the label property, this is the text shown in the button
  done.label = "Done";

  // Return the response action.  You can return multiple response functions.
  return [done];
};
// Attach the label property, this is currently reference by the pick your poison action to generate buttons
testAction.label = "Test Action";

export default testAction;
```

3. You will now have to add your newly created action to the action index for it to be actionable within the game.  
Within `game/actions/index.js` make the following changes.

```js
// import your new action
import testAction from "./testAction";

...
const initializeActions = taskConfigs =>
  [
    // We use a task configuration to determine if the task is active. We will get to this in the next step.
    // createProbability takes your action and the probability percentage the action will be invoked
    taskConfigs.testAction && createProbability(testAction, 5),
    // other actions
  ].filter(action => action !== null);
```

4. Now you must configure your new action by specifiying it's default disabled value within `src/configureStore.js`

```js
import store from "store";
import { GripStrengthEnum } from "game/enums/GripStrength";

const defaultConfig = {
  tasks: {
    testAction: true
    // other actions
  }
}
```

5. You must add the ability for the user to enable or disable the action.  This is done within the `containers/Pages/ConfigPage.js`

```js
<TaskList
    title="Speed"
    tasks={{
      // other actions
      testAction: "Test Action"
    }}
/>
```

6. To test your new action, I like to set it's probability to 100 within the `actions/index.js` file, disable all other actions on the `ConfigPage` after launching the application.  Your action should be triggered within a few seconds.

# Other Stuff

### TODO (move to issues on GitHub)

misc
-keyboard shortcuts
-visual graph/something of the beat

carousel
-say on same gif
-video option with next button

anal cards
-depth
-size
-hands off card during anal
-after orgasm fucking

anal + cei
-self facial while anal

cei
-cum play
-self facial

forced intox
-shots
-poppers

sissy
-gagging/deepthroat

DEEP Throat Cards

1.  [4] put the head of your dildo in your mouth for 15 seconds
2.  [2] slowly swallow it down your throat once
3.  [1] push it down your throat and leave it there for 3 seconds
4.  [3] Put all that spit onto your genitals and over the tits
5.  [2] you have to hold it in your throat for 10 seconds, smack your face once during this
6.  [3] Fuck your throat with your dildo 16 times, then hold it in for 8 seconds. Do this 3 times in a row. Take a break only to spit into the bowl
7.  [6] Take all that spit play with it for more than 5 minutes, get in anywhere on face, except hair
8.  [4] Push the dildo as deep as you can and out of the mouth fast 120 times. Only pause to spit into the bowl, then resume immediately.
9.  [2] Smack your face with wet dildo hard enough to feel punished 4 times
10. [3] push the dildo as far as you can, and rotate it 360° 3 times then fuck your throat 6 times. Do this 3 times in a row, pause only for spitting into the bowl
11. [3] push dildo as far as you can, leave it there for 15 seconds
12. [1] Sit down, drool the spit and try to take it back to your mouth without using your hands. A little tip: imagine you're drinking with a straw
13. Rotate dildo 3 times
    Spit on your face
    Rotate dildo 3 times
    Spit on your face
    Hold dildo in throat for 20 seconds, keep spit in mouth.
    Rotate dildo 2 times then hold 10 seconds in, keep spit in mouth.

