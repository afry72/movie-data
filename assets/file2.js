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
            if(data.Response === "True") {
                displaySearchResults(movieTitle, data);
                saveSearchResultstoLocalStorage(movieTitle, data);
            } else {
                const movieDetailsContainer = document.getElementById('movieDetails');
                movieDetailsContainer.innerHTML = `<p>${data.Error}</p>`;
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displaySearchResults(movieTitle, data) {
    const movieDetailsContainer = document.getElementById('movieDetails');
    movieDetailsContainer.innerHTML = '';

    if(data.response === "True") {
        const movieDetailsHTML = `
            <h2>${movie.Title}</h2>
            <p><strong>Title:</strong> ${data.title}</p>
            <p><strong>Year:</strong> ${data.Year}</p>
            <p><strong>Genre:</strong> ${data.Genre}</p>
            <p><strong>Plot:</strong> ${data.Plot}</p>
            <p><strong>IMDb Rating:</strong> ${data.imdbRating}</p>
        `;
        movieDetailsContainer.innerHTML = movieDetailsHTML;
    } else {
        movieDetailsContainer.innerHTML = `<p>${data.Error}</p>`;
    }
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