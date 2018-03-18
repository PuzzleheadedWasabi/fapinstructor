import { interruptible } from "engine/interrupt";

/**
 * Creates an interruptible awaitable delay
 */
export default ms =>
  new Promise((resolve, reject) => interruptible(setTimeout(resolve, ms), reject));
