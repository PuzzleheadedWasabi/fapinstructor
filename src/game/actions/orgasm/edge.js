// import * as actions from "../../index";
// import * as styleActions from "../style";
// import { NOTIFICATION_TYPE, createNotification } from "../../notification";
// import { inclusiveIntegerRandom } from "../../../utils/MathHelper";
// import { interruptTimeout } from "../../../utils/ReduxHelper";

// export const edge = (cb) => async (dispatch, getState) => {
//   const { config: { fastestSpeed } } = getState();
//   window.audio.play("edge");

//   dispatch(actions.setCommandsEnabled(false));
//   dispatch(actions.setSpeed(fastestSpeed));
//   dispatch(styleActions.setNormalGripStrength());
//   dispatch(styleActions.playStyleDominate());
//   dispatch(
//     createNotification(
//       NOTIFICATION_TYPE.WARNING,
//       "Get to the edge for me",
//       "Edge Card"
//     )
//   );

//   return actions.createCallback(dispatch)(cb || handleEdge, "Edging");
// };

// export const rideEdge = length => async (dispatch, getState, subscribe) => {
//   dispatch(actions.setSpeed(0));
//   dispatch(
//     createNotification(NOTIFICATION_TYPE.WARNING, "Ride the edge!", "Edge Card")
//   );
//   window.audio.play("keep_stroking");
// };

// export const handleEdge = () => async (dispatch, getState, subscribe) => {
//   const { config: { slowestSpeed, edgeCooldown } } = getState();

//   dispatch(actions.incrementEdges());

//   const holdit = inclusiveIntegerRandom(1, 2);
//   let length = 0;
//   dispatch(actions.setSpeed(0));

//   if (holdit === 1) {
//     length = inclusiveIntegerRandom(5000, 30000);
//     dispatch(rideEdge(length));
//   }

//   interruptTimeout(getState, subscribe)(() => {
//     setTimeout(() => {
//       window.audio.play("start_stroking_again");
//       dispatch(
//         createNotification(
//           NOTIFICATION_TYPE.INFO,
//           "Start stroking again!",
//           "Speed Card"
//         )
//       );
//       dispatch(actions.setSpeed(slowestSpeed));
//       dispatch(actions.setCommandsEnabled(true));
//     }, edgeCooldown * 1000);

//     dispatch(
//       createNotification(
//         NOTIFICATION_TYPE.WARNING,
//         "Let go of your cock!",
//         "Edge Card"
//       )
//     );
//   }, length);
// };
