const apiKey = '23774e88';

function searchMovie() {
    const movieTitle = document.getElementById('movieTitle').value.trim();
    
    if(movieTitle === "") {
    alert("Please enter movie title");
    return;
    }
    const apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const movieDetailsContainer = document.getElementById('movieDetails');
            if(data.Response === "True") {
                movieDetailsContainer.innerHTML = `
                    <h2>${data.Title}</h2>
                    <p><strong>Year:</strong> ${data.Year}</p>
                    <p><strong>Genre:</strong> ${data.Genre}</p>
                    <p><strong>Plot:</strong> ${data.Plot}</p>
                    <p><strong>IMDb Rating:</strong> ${data.imdbRating}</p>
                `;
                saveSearchResultstoLocalStorage(movieTitle, data);
                displaySearchResults(data);
            } else {
                movieDetailsContainer.innerHTML = '<p>${data.Error}</p>';
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displaySearchResults(results) {

}
function saveSearchResultstoLocalStorage(query, results) {
    const searchResults ={
        query: query,
        results: results
    };
    localStorage.setItem(query, JSON.stringify(searchResults));
}
function handleSearch(event) {
    event.preventDefault();
    searchMovie();
}

function init() {
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', handleSearch);
}
window.addEventListener('load', init);