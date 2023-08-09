import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove, get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://wearethechampions-c1cbd-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

const endorsementInputEl = document.getElementById("endorsement-input")
const fromInputEl = document.getElementById("from-input")
const toInputEl = document.getElementById("to-input")
const publishBtnEl = document.getElementById("publish-btn")
const endoresmentListEl = document.getElementById("endorsement-list")

publishBtnEl.addEventListener("click", function() {
    let inputValue = endorsementInputEl.value
    let fromValue = fromInputEl.value
    let toValue = toInputEl.value
    
    if (inputValue === "" || fromValue === "" || toValue === "") 
    {
        return
    }
    
    let endorsement = {
        endorsement: inputValue,
        from: fromValue,
        to: toValue
    }
    
    push(endorsementsInDB, endorsement)
    
    clearInputElements()
})

onValue(endorsementsInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearEndoresmentListEl()
        
        for (let i = itemsArray.length - 1; i > -1; i--) {
            let currentItem = itemsArray[i]
            appendItemToEndoresmentListEl(currentItem)
        }    
    } else {
        clearEndoresmentListEl()
    }
})

function clearEndoresmentListEl() {
    endoresmentListEl.innerHTML = ""
}

function clearInputElements() {
    endorsementInputEl.value = ""
    fromInputEl.value = ""
    toInputEl.value = ""
}

function appendItemToEndoresmentListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let liEl = document.createElement("li")
    let endorsementEl = document.createElement("span")
    let fromEl = document.createElement("span")
    let toEl = document.createElement("span")
    
    endorsementEl.textContent = itemValue.endorsement
    endorsementEl.className = "endorsement-text"
    
    fromEl.textContent = "From " + itemValue.from
    fromEl.className = "to-from-text"
    toEl.textContent = "To " + itemValue.to
    toEl.className = "to-from-text"
    
    liEl.append(toEl)
    liEl.append(endorsementEl)
    liEl.append(fromEl)
    
    liEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `endorsements/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    
    endoresmentListEl.append(liEl)
}