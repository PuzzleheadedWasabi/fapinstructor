import shuffle from "lodash.shuffle";
import uniq from "lodash.uniq";
import store from "store";
import fetchManyPics from "api/fetchRedditPics";
import remoteControl from "./remoteControl";

import copyToClipboard from "utils/copyToClipboard";

export const slideRemoteControl = Object.create(remoteControl);

var recentNextAfter = {};
var handlersAdded = false;

const nextSlide = async () => {
  // load more pictures when close to running out
  if (5 > store.game.pictures.length - store.game.pictureIndex) {
    await fetchPictures();
  }

  store.game.pictureIndex++;

  // cache the next image
  if (store.game.pictureIndex + 1 < store.game.pictures.length) {
    new Image().src = store.game.pictures[store.game.pictureIndex + 1];
  }

  // set the active picture to a fetched image
  store.game.activePicture = store.game.pictures[store.game.pictureIndex];

  // Check we have added handlers for on video complete and on space bar press
  if(!handlersAdded){
    handlersAdded = true;
    registerHandlers();
  }

};

function registerHandlers(){

    let el = document.querySelector('video');
    el.addEventListener('ended', nextSlide, false);

    function handleKey(event){
      if(event.key == "p") {

        let current = recentNextAfter || "No state (we started fresh)";
        let next = JSON.stringify(window['nextAfter']);

        console.log(">> Current state <<")
        console.log(current)

        console.log(">> Next state <<")
        console.log(next);

        copyToClipboard(current);

      }
      if(event.key == "ArrowRight") nextSlide();
    }

    document.addEventListener('keydown', handleKey, false);

}

var firstFetch = true;

const fetchPictures = () => {

  const { subreddits, tumblrOffset, subredditState } = store.config;

  if(!window['nextAfter'] && subredditState) {

    console.log('>> Resuming state <<');
    window['nextAfter'] = JSON.parse(subredditState)
    console.log(window['nextAfter'])

  }

  const ids = subreddits.split(",").map(id => id.trim());

  // Before we fetch, cache the nextAfter
  recentNextAfter = JSON.stringify(window['nextAfter']);

  // make a fetch to tumblr for each tumblr id
  const fetches = ids.map((id, index) =>
    fetchManyPics(id)
  );

  // execute the array of promises and append the randomized pictures to the global array
  return Promise.all(fetches).then(results => {
    let newImages = [];

    results.forEach(({ images, offset }, index) => {
      newImages = newImages.concat(images);
      store.config.tumblrOffset[index] = offset;
    });

    store.game.pictures = [...store.game.pictures, ...uniq(shuffle(newImages))];

    if (newImages.length === 0) {
      store.game.pictureIndex = 0;
    }
  });
};

let lastSlideChange = -1;
const slideLoop = progress => {
  if (!slideRemoteControl.paused) {

    // let el = document.querySelector('video');
    // let videolength = el ? (el.duration || 5000) : 5000;

    // console.log('Video length is ' + videolength);

    if (
      // lastSlideChange >= (videolength) * 1000 ||
      lastSlideChange === -1
    ) {
      nextSlide();
      lastSlideChange = 0;
    } else {
      lastSlideChange += progress;
    }
  }
};

slideLoop.onSubscribe = () => {
  lastSlideChange = -1;
}

export default slideLoop; 