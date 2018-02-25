const playAudioFile = buffer => {
  if (window.myAudioContext) {
    const source = window.myAudioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(window.myAudioContext.destination);

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

export default playAudioFile;
