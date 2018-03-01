import shuffle from "lodash.shuffle";
import uniq from "lodash.uniq";
import store from "store";
import fetchManyPics from "api/fetchTumblrPics"

let lastSlideChange = -1;

export default progress => {
  if (lastSlideChange >= store.config.slideDuration * 1000 || lastSlideChange === -1) {
    nextSlide();
    lastSlideChange = 0;
  } else {
    lastSlideChange += progress;
  }
};


const nextSlide = async () => {
  const { pictures } = store.game;

  store.game.shownSlides++;
  store.game.pictureIndex++;

  // cache the next image
  if (store.game.pictureIndex + 1 < pictures.length) {
    new Image().src = pictures[store.game.pictureIndex + 1];
  }

  // load more pictures when close to running out
  if (5 > pictures.length - store.game.pictureIndex) {
    await fetchPictures();
  console.log('slideLoop')

  }
}

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
