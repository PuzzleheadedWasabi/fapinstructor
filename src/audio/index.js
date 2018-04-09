import { getRandomInclusiveInteger } from "utils/math";
import { fetchAudioFile } from "engine/audio";

// denied
import denied1 from "../audio/denied/1.mp3";
// faster
import faster1 from "../audio/faster/1.mp3";
import faster2 from "../audio/faster/1.mp3";
// moan
import moan1 from "../audio/moan/1.mp3";
import moan2 from "../audio/moan/2.mp3";
import moan3 from "../audio/moan/3.mp3";
import moan4 from "../audio/moan/4.mp3";
import moan5 from "../audio/moan/5.mp3";
import moan6 from "../audio/moan/6.mp3";
import moan7 from "../audio/moan/7.mp3";
import moan8 from "../audio/moan/8.mp3";
import moan9 from "../audio/moan/9.mp3";
import moan10 from "../audio/moan/10.mp3";
import moan11 from "../audio/moan/11.mp3";
import moan12 from "../audio/moan/12.mp3";
import moan13 from "../audio/moan/13.mp3";
import moan14 from "../audio/moan/14.mp3";
import moan15 from "../audio/moan/15.mp3";
import moan16 from "../audio/moan/16.mp3";
import moan17 from "../audio/moan/17.mp3";
import moan18 from "../audio/moan/18.mp3";
import moan19 from "../audio/moan/19.mp3";
import moan20 from "../audio/moan/20.mp3";
import moan21 from "../audio/moan/21.mp3";
import moan22 from "../audio/moan/22.mp3";
import moan23 from "../audio/moan/23.mp3";
import moan24 from "../audio/moan/24.mp3";
// orgasm
import orgasm1 from "../audio/orgasm/1.mp3";
import orgasm2 from "../audio/orgasm/2.wav";
import orgasm3 from "../audio/orgasm/3.mp3";
// ruined
import ruined1 from "../audio/ruined/1.mp3";
import ruined2 from "../audio/ruined/2.mp3";
import ruined3 from "../audio/ruined/3.wav";
// misc.
import card from "../audio/card.wav";
import cardshuffle from "../audio/cardshuffle.mp3";
import dontcumyet from "../audio/dontcumyet.wav";
import edge from "../audio/edge.mp3";
import holdedge from "../audio/holdedge.mp3";
import keep_stroking from "../audio/keep_stroking.mp3";
import longMoan from "../audio/longMoan.mp3";
import obey from "../audio/obey.mp3";
import ruinitforme from "../audio/ruinitforme.mp3";
import slapballs from "../audio/slapballs.wav";
import squeezeballs from "../audio/squeezeballs.wav";
import start_stroking_again from "../audio/start_stroking_again.wav";
import startgame from "../audio/startgame.wav";
import thereYouGo from "../audio/thereYouGo.wav";
import tick from "../audio/tick.mp3";
import tighter from "../audio/tighter.mp3";

export const audioVariations = {
  Moan: 24,
  Faster: 2,
  Denied: 1,
  Orgasm: 3,
  Ruined: 3
};

export const getRandomAudioVariation = key => {
  if (!audioVariations.hasOwnProperty(key)) {
    throw new Error(`No audio variation found for ${key}`);
  }
  return audioLibrary[
    `${key}${getRandomInclusiveInteger(1, audioVariations[key])}`
  ];
};

const audioLibrary = {
  // denied
  Denied1: fetchAudioFile(denied1),
  // faster
  Faster1: fetchAudioFile(faster1),
  Faster2: fetchAudioFile(faster2),
  // moan
  Moan1: fetchAudioFile(moan1),
  Moan2: fetchAudioFile(moan2),
  Moan3: fetchAudioFile(moan3),
  Moan4: fetchAudioFile(moan4),
  Moan5: fetchAudioFile(moan5),
  Moan6: fetchAudioFile(moan6),
  Moan7: fetchAudioFile(moan7),
  Moan8: fetchAudioFile(moan8),
  Moan9: fetchAudioFile(moan9),
  Moan10: fetchAudioFile(moan10),
  Moan11: fetchAudioFile(moan11),
  Moan12: fetchAudioFile(moan12),
  Moan13: fetchAudioFile(moan13),
  Moan14: fetchAudioFile(moan14),
  Moan15: fetchAudioFile(moan15),
  Moan16: fetchAudioFile(moan16),
  Moan17: fetchAudioFile(moan17),
  Moan18: fetchAudioFile(moan18),
  Moan19: fetchAudioFile(moan19),
  Moan20: fetchAudioFile(moan20),
  Moan21: fetchAudioFile(moan21),
  Moan22: fetchAudioFile(moan22),
  Moan23: fetchAudioFile(moan23),
  Moan24: fetchAudioFile(moan24),
  // orgasm
  Orgasm1: fetchAudioFile(orgasm1),
  Orgasm2: fetchAudioFile(orgasm2),
  Orgasm3: fetchAudioFile(orgasm3),
  // ruined
  Ruined1: fetchAudioFile(ruined1),
  Ruined2: fetchAudioFile(ruined2),
  Ruined3: fetchAudioFile(ruined3),
  // misc.
  Card: fetchAudioFile(card),
  CardShuffle: fetchAudioFile(cardshuffle),
  DontCumYet: fetchAudioFile(dontcumyet),
  Edge: fetchAudioFile(edge),
  HoldEdge: fetchAudioFile(holdedge),
  KeepStroking: fetchAudioFile(keep_stroking),
  LongMoan: fetchAudioFile(longMoan),
  Obey: fetchAudioFile(obey),
  RuinItForMe: fetchAudioFile(ruinitforme),
  SlapBalls: fetchAudioFile(slapballs),
  SqueezeBalls: fetchAudioFile(squeezeballs),
  StartStrokingAgain: fetchAudioFile(start_stroking_again),
  StartGame: fetchAudioFile(startgame),
  ThereYouGo: fetchAudioFile(thereYouGo),
  Tick: fetchAudioFile(tick),
  Tighter: fetchAudioFile(tighter)
};

export default audioLibrary;
