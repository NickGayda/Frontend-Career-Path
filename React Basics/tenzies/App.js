import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rollCount, setRollCount] = React.useState(0)
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            const rollRecord = localStorage.getItem("rolls")
            if (rollRecord > rollCount || !rollRecord) {
                localStorage.setItem("rolls", rollCount)
            }
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function newGame() {
        setTenzies(false)
        setDice(allNewDice())
        setRollCount(0)
    }
    
    function rollDice() {
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? 
                die :
                generateNewDie()
        }))
        setRollCount(oldRollCount => oldRollCount + 1)
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            let clone = Object.assign({}, die)
            clone.isHeld = !clone.isHeld
            return die.id === id ? 
                clone :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={tenzies ? newGame : rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
            <div className="stats">
                <h3>{tenzies ? `Lowest Roll Game: ${localStorage.getItem("rolls")}` : `Rolls: ${rollCount}`}</h3>
            </div>
        </main>
    )
}