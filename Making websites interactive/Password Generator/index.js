const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

function generatePasswords() {
    let passwordElementOne = document.getElementById("password-one")
    let passwordElementTwo = document.getElementById("password-two")
    passwordElementOne.textContent = "";
    passwordElementTwo.textContent = "";
    for (let i = 0; i < 15; i++) {
        passwordElementOne.textContent += randomCharacter()
        passwordElementTwo.textContent += randomCharacter()
    }
}

function randomCharacter() {
    return characters[Math.floor(Math.random() * characters.length)]
}

function copyPassword(element) {
    let passwordElement = document.getElementById(element);
    
    if (passwordElement.textContent.length === 0) { return }
    
    var range = document.createRange();
    range.selectNode(passwordElement);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    alert("Copied password: " + passwordElement.textContent)
}