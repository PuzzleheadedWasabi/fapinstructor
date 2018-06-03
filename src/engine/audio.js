let context;
const AudioContext = window.AudioContext || window.webkitAudioContext;
if (window.AudioContext) {
  context = new AudioContext();
}
window.context = context;

const fetchAudioFile = async url => {
  let buffer;

  if (context && context.decodeAudioData) {
    buffer = await new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.responseType = "arraybuffer";
      request.onerror = reject;
      request.onload = () => {
        resolve(context.decodeAudioData(request.response));
      };
      request.send();
    });
  } else {
    // ie11 fallback
    buffer = new Audio(url);
  }

  return buffer;
};

const play = async file => {
  const buffer = await file;

  if (context) {
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);

    if (!source.start) source.start = source.noteOn;
    source.start(0);
  } else {
    const promise = buffer.play();
    if (promise) {
      promise.catch(error =>
        console.error("Failed to play audio fallback", error)
      );
    }
  }
};

export { fetchAudioFile };
export default play;
