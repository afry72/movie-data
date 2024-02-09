const formEl = document.getElementById('form');
const resultsContainerEl = document.querySelector('#results-container');

// render youtube localstorage data if there is any on page load/refresh
function renderYoutubeData() {
  const data = JSON.parse(localStorage.getItem('youtube')) ?? {};
  if (Object.keys(data).length) {
    const { thumbnail, url } = data;
    render(thumbnail, url);
  }
}

// create the image and link and set their attributes
function createYoutubeDataElements(thumbnail, url) {
  const containerEl = document.createElement('div');
  const imageEl = document.createElement('img');
  const linkEl = document.createElement('a');

  containerEl.setAttribute('id', 'thumbnail-container');
  imageEl.setAttribute('src', thumbnail);
  linkEl.setAttribute('href', url);
  linkEl.textContent = 'Watch on YouTube';

  containerEl.appendChild(imageEl);
  containerEl.appendChild(linkEl);

  return containerEl;
}

// save youtube data to local storage
function saveYoutubeData(data) {
  localStorage.setItem('youtube', JSON.stringify(data));
}

// build up the elements that will hold the youtube video thumbnail and youtube video url
// then append to parent element
function render(thumbnail, url) {
  const containerEl = createYoutubeDataElements(thumbnail, url);

  const thumbnailContainerEl = document.getElementById('thumbnail-container');

  saveYoutubeData({ thumbnail, url });

  if (thumbnailContainerEl !== null) {
    thumbnailContainerEl.innerHTML = '';
  }

  resultsContainerEl.appendChild(containerEl);
}

// parse the youtube data response to get the video id and thumbnail out.
// then render the data
function displayYouTubeData(data) {
  const result = data[0];
  const thumbnail = result.snippet.thumbnails.high.url;
  const videoId = result.id.videoId;
  const url = `https://www.youtube.com/watch?v=${videoId}`;

  render(thumbnail, url);
}

/* fetch a youtube video/trailer using the provided movie title
 from input*/
function getYouTubeData(event) {
  event.preventDefault();

  const searchValue = formEl.search.value;

  if (searchValue.trim().length === 0) {
    return;
  }

  const YOUTUBE_API_KEY = 'AIzaSyCHBumtJUZPMDbHVLiIxIlCfNChMjaUTGk';
  const YOUTUBE_ENDPOINT = `https://www.googleapis.com/youtube/v3/search?q=${searchValue}&key=${YOUTUBE_API_KEY}&part=snippet`;

  fetch(YOUTUBE_ENDPOINT)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      if (data.items.length) {
        displayYouTubeData(data.items);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

renderYoutubeData();
formEl.addEventListener('submit', getYouTubeData);
