let homeScore = document.getElementById("home-score");
let guestScore = document.getElementById("guest-score");

let home = 0;
let guest = 0;

function addScore(team, amount) {
    if (team == "home") {
        home += amount;
        homeScore.textContent = home;
    }
    
    if (team == "guest") {
        guest += amount;
        guestScore.textContent = guest;
    }
}

function newGame() {
    home = 0;
    guest = 0;
    homeScore.textContent = home;
    guestScore.textContent = guest;
}