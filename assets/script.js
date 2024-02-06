function searchMovie() {
    const movieTitle = document.getElementById('movieTitle').value;
    if(movieTitle.trim() === "")
    alert("Please enter movie title");
    return;
}

const apikey = 'http://www.omdbapi.com/?i=tt3896198&apikey=23774e88';

const apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`;

