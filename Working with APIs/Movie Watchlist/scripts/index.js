const apiKey = '36a48408'
const movieSearch = document.getElementById('movie-search')
const movieInput = document.getElementById('movie-input')
const movieForm = document.getElementById('movie-form')
const movieDisplay = document.getElementById('movie-display')

document.addEventListener('click', (e) => {
    if (e.target.parentNode.dataset.imdbId && !e.target.parentNode.dataset.added) {
        addMovieToWatchlist(e.target.parentNode.dataset.imdbId)
        e.target.parentNode.dataset.added = true
    }
})

document.getElementById('watchlist').addEventListener('click', () => window.location.href = '/watchlist.html')

movieForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const search = movieInput.value

    if (!search) { return }

    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${search}&type=movie`)
        .then(res => res.json())
        .then(data => {
            movieDisplay.innerHTML = ''

            if (data.Response == 'False') {
                movieDisplay.innerHTML = '<p>Unable to find what you’re looking for. Please try another search.</p>'
                return
            }

            data.Search.forEach(movie => {
                fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
                    .then(res => res.json())
                    .then(movie => {
                        addMovieToDisplay(movie)
                    })
            })
        })
})

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
                <div class='movie-watchlist' id='add-to-watchlist' data-imdb-id='${movie.imdbID}'>
                    <i class="fa-solid fa-circle-plus"></i>
                    <span>Watchlist</span>
                </div>
            </div>
            <div class='movie-plot'>${movie.Plot}</div>
        </div>
    </div>
    `
}

function addMovieToWatchlist(imdbID) {
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
        .then(res => res.json())
        .then(movie => {
            const movies = JSON.parse(localStorage.getItem('watchlist')) || []
            movies.push(movie)

            localStorage.setItem('watchlist', JSON.stringify(movies))
        })
}