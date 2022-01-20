import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import Timer from './Timer'

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rollCount, setRollCount] = React.useState(1)

    const [time, setTime] = React.useState(0)

    React.useEffect(() => {
        let interval = null

        if (rollCount > 1 && !tenzies) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10)
            }, 10)
        }
        return () => clearInterval(interval)
    },[tenzies, dice])
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
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
    
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            setRollCount(prevCount => prevCount + 1)
        } else {
            setTime(0)
            setTenzies(false)
            setRollCount(1)
            setDice(allNewDice())
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
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
            <p className="instructions">{!tenzies ? "Jogue até que todos o dados estejam iguais. Clique em cada dado para congelar seu valor entre as jogadas!" : "Você ganhou!"}</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <Timer time={time} />
            <p>N° de jogadas: {rollCount}</p>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "Novo jogo" : "Jogar"}
            </button>
        </main>
    )
}