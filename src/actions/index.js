import actionIterator from "../engine/actionIterator";
import generateAction from "./generateAction";

/**
 * Create an actionIterator using a action generator
 */
export default new actionIterator(generateAction);
