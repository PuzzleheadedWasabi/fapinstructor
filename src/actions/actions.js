/**
 * A generator that returns the next action
*/
function* getActions(generateAction) {
  while(true) {
    yield generateAction();
  }
}

export default (generateAction) => new getActions(generateAction)
