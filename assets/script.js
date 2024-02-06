const YOUTUBE_API_KEY = 'AIzaSyCHBumtJUZPMDbHVLiIxIlCfNChMjaUTGk';
const movieTitle = document.getElementById('movieTitle').value;
function searchMovie() {
  if (movieTitle.trim() === '') alert('Please enter movie title');
  return;
}

/* fetch a youtube video/trailer using the provided movie title
 from input*/
function getYouTubeVideo() {
  const YOUTUBE_ENDPOINT = `https://www.googleapis.com/youtube/v3/search?q=${movieTitle}&key=${YOUTUBE_API_KEY}`;

  if (!movieTitle || movieTitle.trim().length === 0) {
    return;
  }

  fetch(YOUTUBE_ENDPOINT)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (err) {
      console.log(err);
    });
}

const apikey = 'http://www.omdbapi.com/?i=tt3896198&apikey=23774e88';

const apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`;
