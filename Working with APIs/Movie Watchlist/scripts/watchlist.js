const apiKey = '36a48408'
const movieDisplay = document.getElementById('movie-display')

document.addEventListener('click', (e) => {
    if (e.target.parentNode.dataset.imdbId) {
        removeMovieFromWatchlist(e.target.parentNode.dataset.imdbId)
    }
})

document.getElementById('search-movies').addEventListener('click', () => window.location.href = '/')

function addMovieToDisplay(movie) {
    if (movie.Poster == 'N/A' || !movie.Ratings.find(rating => rating.Source === 'Internet Movie Database') || movie.Plot == 'N/A' || movie.Runtime == 'N/A')
    {
        return
    }
    
    movieDisplay.innerHTML += `
    <div class='movie-container'>
        <img class='movie-poster' src='${movie.Poster}' alt='movie poster for ${movie.Title}'>
        <div class='movie-description'>
            <div class='movie-title-rating'>
                <h3>${movie.Title}</h3>
                <div class='movie-rating'>
                    <i class="fa-solid fa-star"></i>
                    <span>${movie.Ratings.find(rating => rating.Source === 'Internet Movie Database').Value.slice(0, -3)}</span>
                </div>
            </div>
            <div class='movie-runtime-genre-watchlist'>
                <div class='movie-runtime-genre'>
                    <div>${movie.Runtime}</div>
                    <div>${movie.Genre}</div>
                </div>
                <div class='movie-watchlist' id='remove-from-watchlist' data-imdb-id='${movie.imdbID}'>
                    <i class="fa-solid fa-circle-minus"></i>
                    <span>Remove</span>
                </div>
            </div>
            <div class='movie-plot'>${movie.Plot}</div>
        </div>
    </div>
    `
}

function removeMovieFromWatchlist(imdbID) {
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
        .then(res => res.json())
        .then(movie => {
            let movies = JSON.parse(localStorage.getItem('watchlist')) || []
            movies = movies.filter(m => m.imdbID != movie.imdbID)

            localStorage.setItem('watchlist', JSON.stringify(movies))
            render()
        })
}

function render() {
    const movies = JSON.parse(localStorage.getItem('watchlist')) || []
    console.log(movies)
    movieDisplay.innerHTML = ''

    if (movies.length == 0) {
        movieDisplay.innerHTML = '<p>Your watchlist is looking a little empty...</p>'
    } else {
        movies.forEach(movie => {
            addMovieToDisplay(movie)
        }) 
    }
}

render()