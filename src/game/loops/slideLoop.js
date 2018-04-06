import shuffle from "lodash.shuffle";
import uniq from "lodash.uniq";
import store from "store";
import fetchManyPics from "api/fetchTumblrPics";
import remoteControl from "./remoteControl";

export const slideRemoteControl = Object.create(remoteControl);

let lastSlideChange = -1;

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
};

const fetchPictures = () => {
  const { tumblrId, tumblrOffset } = store.config;

  return fetchManyPics(
    tumblrId,
    { pictures: store.config.pictures, gifs: store.config.gifs },
    tumblrOffset
  ).then(({ images, offset }) => {
    let shuffledPictures = uniq(shuffle(images));

    store.game.pictures = [...store.game.pictures, ...shuffledPictures];
    store.config.tumblrOffset = offset;

    if (images.length === 0) {
      store.game.pictureIndex = 0;
    }
  });
};

const slideLoop = progress => {
  if (!slideRemoteControl.paused) {
    if (
      lastSlideChange >= store.config.slideDuration * 1000 ||
      lastSlideChange === -1
    ) {
      nextSlide();
      lastSlideChange = 0;
    } else {
      lastSlideChange += progress;
    }
  }
};

export default slideLoop;
