// import * as actions from "../../index";
// import { edge, rideEdge } from "./edge";
// import { NOTIFICATION_TYPE, createNotification } from "../../notification";
// import { ruinOrgasm } from "./ruin";
// import { inclusiveIntegerRandom } from "../../../utils/MathHelper";

// export const ORGASM_TYPE = {
//   ORGASM: "ORGASM",
//   RUINED: "RUINED",
//   DENIED: "DENIED"
// };

// export const CEI_TYPE = {
//   NONE: "NONE",
//   FACE: "FACE",
//   MOUTH: "MOUTH",
//   HAND: "HAND",
//   FLOOR: "FLOOR",
//   PLATE: "PLATE"
// };

// export const CEI_DURING_TYPE = {
//   RUINED: "RUINED",
//   ORGASM: "ORGASM",
//   RANDOM: "RANDOM"
// }

// export const determineOrgasm = () => async (dispatch, getState, subscribe) => {
//   dispatch(actions.setCommandsEnabled(false));
//   return dispatch(edge(handleEdge));
// };

// export const handleEdge = () => async (dispatch, getState) => {
//   const length = inclusiveIntegerRandom(10000, 30000);
//   dispatch(rideEdge(length));
//   return actions.createCallback(dispatch)(handlEdgeEnd, "", length);
// };

// export const handlEdgeEnd = () => async (dispatch, getState) => {
//   const {
//     counters: { ruined },
//     config: { fastestSpeed, orgasm, minRuined, maxRuined, ruinedProbability }
//   } = getState();

//   dispatch(actions.incrementEdges());

//   if (ruined < minRuined) {
//     return dispatch(ruinOrgasm());
//   } else if (ruined < maxRuined) {
//     const rand = Math.random();
//     if (rand <= ruinedProbability / 100) {
//       return dispatch(ruinOrgasm());
//     }
//   }

//   let speed;
//   let audioName;
//   let message;
//   let notificationType;

//   switch (orgasm) {
//     case ORGASM_TYPE.RUINED:
//       audioName = "ruinitforme";
//       speed = fastestSpeed;
//       message = "Ruin it!";
//       notificationType = NOTIFICATION_TYPE.ERROR;
//       break;
//     case ORGASM_TYPE.DENIED:
//       audioName = "denied";
//       speed = 0;
//       message = "You have been denied!";
//       notificationType = NOTIFICATION_TYPE.ERROR;
//       break;
//     case ORGASM_TYPE.ORGASM:
//       audioName = "cum";
//       speed = fastestSpeed;
//       message = "You have permission!";
//       notificationType = NOTIFICATION_TYPE.SUCCESS;
//       break;
//     default:
//   }

//   dispatch(actions.setSpeed(speed));
//   window.audio.play(audioName);
//   dispatch(
//     createNotification(notificationType, message, "Orgasm Determiniation")
//   );

//   return [
//     actions.createCallback(dispatch)(handleDetermineOrgasm),
//     actions.createCallback(dispatch)(handleSkipDetermineOrgasm, "Skip")
//   ];
// };

// export const handleDetermineOrgasm = () => async (dispatch, getState) => {
//   const { config: { orgasm } } = getState();

//   if (orgasm === ORGASM_TYPE.RUINED) {
//     dispatch(actions.incrementRuined());
//   }

//   dispatch(actions.setSpeed(0));
//   dispatch(actions.setRunning(false));
//   dispatch(setOrgasm(orgasm));

//   if (window.ga) {
//     window.ga("send", "event", "command", ORGASM_TYPE.ORGASM, "orgasm");
//   }
// };

// export const handleSkipDetermineOrgasm = () => async (dispatch, getState) => {
//   const { config: { slowestSpeed, fastestSpeed } } = getState();

//   dispatch(actions.setSpeed((slowestSpeed + fastestSpeed) / 2));
//   dispatch(actions.setAllUpdatesEnabled(true));
// };

// const SET_ORGASM = "SET_ORGASM";
// export const setOrgasm = orgasm => ({
//   type: SET_ORGASM,
//   orgasm
// });
