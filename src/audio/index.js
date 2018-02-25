import fetchAudioFile from "../api/fetchAudioFile";
import tick from "./tick.mp3";
import cum from "./cum.mp3";
import start_stroking_again from "./start_stroking_again.wav";
import denied from "./denied.mp3";
import edge from "./edge.mp3";
import ruined from "./ruined.mp3";
import card from "./card.wav";
import keep_stroking from "./keep_stroking.mp3";
import ruinitforme from "./ruinitforme.mp3";

/**
 * Loads the buffers of the import audio files into memory and
 * returns a promise which resolves to a hash object
 */
const loadFiles = async () => ({
  Tick: await fetchAudioFile(tick),
  Cum: await fetchAudioFile(cum),
  StarStrokingAgain: await fetchAudioFile(start_stroking_again),
  Denied: await fetchAudioFile(denied),
  Edge: await fetchAudioFile(edge),
  Ruined: await fetchAudioFile(ruined),
  Card: await fetchAudioFile(card),
  KeepStroking: await fetchAudioFile(keep_stroking),
  RuinItForMe: await fetchAudioFile(ruinitforme)
});

export { loadFiles };
