// import * as actions from "../../index";
// import { NOTIFICATION_TYPE, createNotification } from "../../notification";

// export const ruinOrgasm = () => async (dispatch, getState, subscribe) => {
//   const { config: { fastestSpeed } } = getState();

//   dispatch(actions.setCommandsEnabled(false));

//   dispatch(actions.setSpeed(fastestSpeed));
//   window.audio.play("ruinitforme");
//   dispatch(createNotification(NOTIFICATION_TYPE.ERROR, "Ruin it", "Ruin it!"));

//   return actions.createCallback(dispatch)(handleRuinOrgasm, "Ruined");
// };

// export const handleRuinOrgasm = () => async (dispatch, getState, subscribe) => {
//   const { config: { ruinCooldown, slowestSpeed } } = getState();

//   window.audio.play("ruined");
//   dispatch(actions.setInterrupt(true));
//   dispatch(actions.incrementRuined());
//   dispatch(actions.incrementMercy());
//   dispatch(actions.setSpeed(0));

//   setTimeout(() => {
//     window.audio.play("start_stroking_again");
//     createNotification(
//       NOTIFICATION_TYPE.INFO,
//       "Start stroking again!",
//       "Speed Card"
//     );
//     dispatch(actions.setSpeed(slowestSpeed));
//     dispatch(actions.setCommandsEnabled(true));
//     dispatch(actions.setInterrupt(false));
//   }, ruinCooldown * 1000);
// };
