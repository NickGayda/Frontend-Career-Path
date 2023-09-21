const cardContainer = document.getElementById('card-container')
const newDeckBtn = document.getElementById('new-deck')
const drawCardsBtn = document.getElementById('draw-cards')
const resultMessage = document.getElementById('result-message')
const cardCount = document.getElementById('card-count')
const computerScoreEl = document.getElementById('computer-score')
const playerScoreEl = document.getElementById('player-score')

let deckId
let computerScore = 0
let playerScore = 0

newDeckBtn.addEventListener('click', () => {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
            cardCount.textContent = `Remaining Cards: ${data.remaining}`

            cardContainer.innerHTML = `
            <div class="card-outline"></div>
            <div class="card-outline"></div>
            `

            drawCardsBtn.disabled = false

            computerScore = 0
            playerScore = 0

            computerScoreEl.textContent = `Computer: ${computerScore}`
            playerScoreEl.textContent = `Player: ${playerScore}`

            resultMessage.textContent = 'Game of War'
        })
})

drawCardsBtn.addEventListener('click', () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {

            let html = ''
            const cardValues = []

            data.cards.forEach((card) => {
                html += `
                <img src='${card.image}' alt='${card.value} of ${card.suit}'>
                `
                cardValues.push(card.value)
            })

            cardContainer.innerHTML = html

            cardCount.textContent = `Remaining Cards: ${data.remaining}`

            const winnerText = determineCardWinner(cardValues[0], cardValues[1])
            resultMessage.textContent = winnerText

            computerScoreEl.textContent = `Computer: ${computerScore}`
            playerScoreEl.textContent = `Player: ${playerScore}`

            if (!data.remaining) { 
                drawCardsBtn.disabled = true

                if (computerScore > playerScore) {
                    resultMessage.textContent = "You lost the game!"
                } else if (computerScore < playerScore) {
                    resultMessage.textContent = "You won the game!"
                } else {
                    resultMessage.textContent = "The game was a tie!"
                }
             }
        })
})

function determineCardWinner(computerCard, playerCard) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    const computerValue = valueOptions.indexOf(computerCard)
    const playerValue = valueOptions.indexOf(playerCard)

    if (computerValue > playerValue) {
        computerScore++
         return 'Computer wins!'
    }
    else if (computerValue < playerValue) {
        playerScore++
        return 'You win!' 
    }
    else {
        return 'War!'
     }
}