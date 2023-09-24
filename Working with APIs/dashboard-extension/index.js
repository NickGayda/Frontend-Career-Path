// Background Image
fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature')
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url('${data.urls.full}')`
        document.getElementById('author').textContent = `By: ${data.user.name}`
    })
    .catch(error => {
        document.body.style.backgroundImage = `url('https://images.unsplash.com/photo-1537210249814-b9a10a161ae4?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTU1MTUzNDl8&ixlib=rb-4.0.3&q=85')`
        document.getElementById('author').textContent = `By: Felix Mittermeier`
    })

// Crypto data
fetch('https://api.coingecko.com/api/v3/coins/ethereum')
    .then(res => {
        if (!res.ok) { throw Error('Crypto data not available.')}
        return res.json()
    })
    .then(data => {
        document.getElementById('crypto-top').innerHTML = `
            <img src='${data.image.small}'>
            <span>${data.name}</span>
        `

        document.getElementById('crypto-bot').innerHTML = `
            <p>Current: $${data.market_data.current_price.usd}</p>
            <p>24h High: $${data.market_data.high_24h.usd}</p>
            <p>24h Low: $${data.market_data.low_24h.usd}</p>
        `
    })
    .catch(error => console.error(error))

// Weather data
navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) { throw Error('Weather data not available.')}
            return res.json()
        })
        .then(data => {
            document.getElementById('weather-top').innerHTML = `
                <img src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'>
                <span>${Math.round(data.main.temp)}°</span>
            `
            document.getElementById('weather-bot').innerHTML = `
                <span>${data.name}</span>
            `
        })
        .catch(error => console.error(error))
})

// Set/Update time
setInterval(() => document.getElementById('time').textContent = new Date().toLocaleTimeString("en-us", {timeStyle: "short"}), 1000)