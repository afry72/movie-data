const apikey = 'http://www.omdbapi.com/?i=tt3896198&apikey=23774e88';

function searchMovie() {
    const movieTitle = document.getElementById('movieTitle').value;
    
    if(movieTitle.trim() === "") {
    alert("Please enter movie title");
    return;
    }
    const apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const movieDetailsContainer = document.getElementById('movieDetails');
            if(data.Response === "True") {
                movieDetailsContainer.innerHTML = 
                <h2>${data.Title}</h2>;
                <><p><strong>Year:</strong> ${data.Year}</p><p><strong>Genre:</strong> ${data.Genre}</p><p><strong>Plot:</strong> ${data.Plot}</p><p><strong>IMDb Rating:</strong> ${data.imdbRating}</p></>;
            } else {
                movieDetailsContainer.innerHTML = '<p>${data.Error}</p>';
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displaySearchResults(results) {

}
function handleSearch(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value.trim();
    if (query === ''){
        return;
    }
    searchMovie(query)
    .then(results => {
        if (results){
            displaySearchResults(results);
        } else {

        }
    });
}

function saveSearchResultstoLocalStorage(query, results) {
    localStorage.setItem(query, JSON.stringify(results));
}

function getSearchResultsFromLocalStorage(query) {
    const cachedResults = localStorage.getItem(query);
    return cachedResults ? JSON.parse(cachedResults) : null;
}

function init() {
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', handleSearch);
}
window.addEventListener('load', init);function searchMovie() {
    const movieTitle = document.getElementById('movieTitle').value;
    
    if(movieTitle.trim() === "") {
    alert("Please enter movie title");
    return;
    }

    const apikey = 'http://www.omdbapi.com/?i=tt3896198&apikey=23774e88';

    const apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const movieDetailsContainer = document.getElementById('movieDetails');
            if(data.Response === "True") {
                movieDetailsContainer.innerHTML = 
                <h2>${data.Title}</h2>;
                <><p><strong>Year:</strong> ${data.Year}</p><p><strong>Genre:</strong> ${data.Genre}</p><p><strong>Plot:</strong> ${data.Plot}</p><p><strong>IMDb Rating:</strong> ${data.imdbRating}</p></>;
            } else {
                movieDetailsContainer.innerHTML = '<p>${data.Error}</p>';
            }
        })
        .catch(error => console.error('Error fetching data:', error));
} 