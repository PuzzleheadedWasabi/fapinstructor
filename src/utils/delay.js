import { interruptible } from "engine/interrupt";

/**
 * Creates an interruptible awaitable delay
 */
export default ms => new Promise(r => interruptible(setTimeout(r, ms)));
