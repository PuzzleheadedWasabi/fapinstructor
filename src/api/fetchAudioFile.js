const fetchAudioFile = async url => {
  let buffer;

  if (window.myAudioContext) {
    buffer = await new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.responseType = "arraybuffer";
      request.onerror = reject;
      request.onload = () => {
        resolve(window.myAudioContext.decodeAudioData(request.response));
      };
      request.send();
    });
  } else {
    // ie11 fallback
    buffer = new Audio(url);
  }

  return buffer;
};

export default fetchAudioFile;
