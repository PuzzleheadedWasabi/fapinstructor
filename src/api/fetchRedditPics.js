import fetchJsonp from "fetch-jsonp";


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}



/**
 * fetches images from reddit. Offset, imageType and limit parameters are ignored. Stores some state very dirtily in window['nextAfter']
 */
const fetchPics = (id, imageType, offset = 0, limit) => {

  // Sets this
  if(!window['nextAfter']) window['nextAfter'] = {};

  let after = window['nextAfter'][id] || ''; // Gets the after of our subreddit

  console.info('Fetchpics called for ' + id + ', after: ' + (after || 'None (First API call)'))

  return fetch(
    // `https://old.reddit.com/r/${encodeURIComponent(id)}/.json?after=${after}`
    `https://old.reddit.com/r/${encodeURIComponent(id)}/top/.json?after=${after}&sort=top&t=year`
    // `https://${encodeURIComponent(id)}.tumblr.com/api/read/json?num=${limit}&type=photo&start=${offset}`
  )
    .then(response => response.json())
    .then(response => {

      window['nextAfter'][id] = response.data.after;

      // debugger;

      let minScore = 100;
      let lowestScoreFound = 10000;

      let urls = [];

      while(urls.length <= 5){

        // Just to prevent going infinite
        if(minScore <= 10){
          console.warn('Giving up')
          break;
        }

        console.log(`Filtering ${id} with score ${minScore}`)
        urls = [];

        for (var i = 0; i < response.data.children.length; i++) {
          let post = response.data.children[i]

          if(post.data.score < lowestScoreFound) lowestScoreFound = post.data.score;

          if(post.data.domain != 'gfycat.com') {
            // console.log('Ignoring non-gfycat link')
            continue;
          }

          if(post.data.score <= minScore) {
            // console.log(`Ignoring low scoring link (Score ${post.data.score})`)
            continue;
          }

          let url = post.data.url;
          url = url.replace('gfycat.com', 'giant.gfycat.com');
          url += '.webm';

          // console.log('Found url ' + url);

          urls.push(url)

        }

        minScore *= 0.8;

      }

      urls = shuffle(urls);
      console.log(`Picked ${urls.length} clips for ${id}. After is now ${response.data.after}. The lowest score that we found was ${lowestScoreFound}.`)

      return urls;

    });
};

/**
 * A recursive fetch to tumblr as there is a limit of 25 images per api call
 */
const limit = 25;
const fetchManyPics = (id, imageType, offset = 0, images = [], recursiveCounter = 0) => { // Settings this to 0. I don't see the point in fetching 50 every time.
  return fetchPics(id, imageType, offset, limit).then(urls => {
    images = images.concat(urls);
    return recursiveCounter === 0
      ? { images, offset }
      : fetchManyPics(id, imageType, offset + limit, images, --recursiveCounter);
  });
};

export default fetchManyPics;
