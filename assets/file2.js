const apiKey = '23774e88';
const resultsContainerEl = document.querySelector('#results-container');

function closeModal() {
  const movieDetailsContainer = document.getElementById('movieDetails');
  movieDetailsContainer.innerHTML = '';
}

// show error modal when movie title is not found or the form input is empty
function showErrorModal(error) {
  const movieDetailsContainer = document.getElementById('movieDetails');
  const modalEl = document.createElement('div');
  const modalContentEl = document.createElement('div');
  const errorEl = document.createElement('p');
  const buttonEl = document.createElement('button');

  buttonEl.textContent = 'Close';
  errorEl.textContent = error;

  buttonEl.addEventListener('click', closeModal);

  modalContentEl.appendChild(errorEl);
  modalContentEl.appendChild(buttonEl);
  modalEl.appendChild(modalContentEl);

  modalEl.classList.add('modal');
  modalContentEl.classList.add('modal-content');

  movieDetailsContainer.appendChild(modalEl);
}

function searchMovie() {
  const movieTitle = document.getElementById('movieTitle').value.trim();

  if (movieTitle === '') {
    showErrorModal('Please enter movie title');
    return;
  }
  const apiUrl = `https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === 'True') {
        displaySearchResults(movieTitle, data);
        saveSearchResultstoLocalStorage(movieTitle, data);
        getYouTubeData(movieTitle);
      } else {
        showErrorModal(data.Error);
        resultsContainerEl.innerHTML = '';
      }
    })
    .catch((error) => console.error('Error fetching data:', error));
}

function displaySearchResults(movieTitle, data) {
  const movieDetailsContainer = document.getElementById('movieDetails');
  movieDetailsContainer.innerHTML = '';

  if (data.Response === 'True') {
    const movieDetailsHTML = constructMovieDetails(data);
    movieDetailsContainer.innerHTML = movieDetailsHTML;
  } else {
    movieDetailsContainer.innerHTML = `<p>${data.Error}</p>`;
  }
}
function saveSearchResultstoLocalStorage(query, results) {
  const searchResults = {
    query: query,
    results: results,
  };
  localStorage.setItem('movie', JSON.stringify(searchResults));
}
function handleSearch(event) {
  event.preventDefault();
  searchMovie();
}

function constructMovieDetails(data) {
  const movieDetailsHTML = `
            <h2>${data.Title}</h2>
            <p class="pure-u-1-6"><strong>Title:</strong> ${data.Title}</p>
            <p class="pure-u-1-6"><strong>Year:</strong> ${data.Year}</p>
            <p class="pure-u-1-6"><strong>Genre:</strong> ${data.Genre}</p>
            <p class="pure-u-1-6"><strong>IMDb Rating:</strong> ${data.imdbRating}</p>
            <img src="${data.Poster}" alt="Movie Poster" class="pure-u-1-4">
            <p class="pure-u-1-6"><strong>Plot:</strong> ${data.Plot}</p>
        `;
  return movieDetailsHTML;
}

function renderMovieData() {
  const movieDetailsContainer = document.getElementById('movieDetails');
  let data = JSON.parse(localStorage.getItem('movie')) ?? {};
  if (Object.keys(data).length) {
    movieDetailsContainer.innerHTML = '';

    data = data.results;

    movieDetailsContainer.innerHTML = constructMovieDetails(data);
  }
}

function init() {
  const searchForm = document.getElementById('searchForm');
  searchForm.addEventListener('submit', handleSearch);
  renderMovieData();
  renderYoutubeData();
}
window.addEventListener('load', init);

// render youtube localstorage data if there is any on page load/refresh
function renderYoutubeData() {
  const data = JSON.parse(localStorage.getItem('youtube')) ?? {};
  if (Object.keys(data).length) {
    const { url } = data;
    render(url);
  }
}

// create the image and link and set their attributes
function createYoutubeDataElements(url) {
  const containerEl = document.createElement('div');
  const linkEl = document.createElement('a');

  containerEl.setAttribute('id', 'link-container');
  linkEl.setAttribute('href', url);
  linkEl.textContent = 'Watch on YouTube';

  containerEl.appendChild(linkEl);

  return containerEl;
}

// save youtube data to local storage
function saveYoutubeData(data) {
  localStorage.setItem('youtube', JSON.stringify(data));
}

// build up the elements that will hold  the youtube video url
// then append to parent element
function render(url) {
  const containerEl = createYoutubeDataElements(url);

  const linkContainerEl = document.getElementById('link-container');

  saveYoutubeData({ url });

  if (linkContainerEl !== null) {
    resultsContainerEl.innerHTML = '';
  }

  resultsContainerEl.appendChild(containerEl);
}

// parse the youtube data response to get the video id  out.
// then render the data
function displayYouTubeData(data) {
  const result = data[0];
  const videoId = result.id.videoId;
  const url = `https://www.youtube.com/watch?v=${videoId}`;

  render(url);
}

/* fetch a youtube video/trailer using the provided movie title
 from input*/
function getYouTubeData(searchValue) {
  const YOUTUBE_API_KEY = 'AIzaSyCHBumtJUZPMDbHVLiIxIlCfNChMjaUTGk';
  const YOUTUBE_ENDPOINT = `https://www.googleapis.com/youtube/v3/search?q=${searchValue}-trailer&key=${YOUTUBE_API_KEY}&part=snippet`;

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
