/**
 * A generator that returns the next action
 *
 *  This function supports,
 *  -prepared actions
 *  -on demand actions
 * @param {An array of actions or a generator function that returns an action} param
 */
function* actionIterator(param) {
  if (Array.isArray(param)) {
    for (let i = 0; i < param.length; i++) {
      yield param[i];
    }
  } else if (typeof param === "function") {
    while (true) {
      yield param();
    }
  }
}

export default actionIterator;
