import React, { useState, useEffect } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Timer from "./components/Timer";
import BestTime from "./components/BestTime";

export default function App() {
    const [dice, setDice] = useState(allNewDice());
    const [tenzies, setTenzies] = useState(false);
    const [rollCount, setRollCount] = useState(1);

    const [time, setTime] = useState(0);
    const [hasStarted, setHasStarted] = useState(() => false);
    const [bestTime, setBestTime] = useState(() =>
        localStorage.getItem("best-time")
            ? parseInt(localStorage.getItem("best-time"))
            : ""
    );

    useEffect(() => {
        let interval = null;

        if (hasStarted && !tenzies) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        }
        return () => clearInterval(interval);
    }, [tenzies, hasStarted]);

    useEffect(() => {
        const allHeld = dice.every((die) => die.isHeld);
        const firstValue = dice[0].value;
        const allSameValue = dice.every((die) => die.value === firstValue);

        if (allHeld && allSameValue) {
            setTenzies(true);
            if (time < bestTime || !bestTime) {
                setBestTime(time);
                localStorage.setItem("best-time", time.toString());
            }
        }
        // estudar useReducer para melhorar o código
    }, [dice, bestTime, time]);

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid(),
        };
    }

    function allNewDice() {
        const newDice = [];
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie());
        }
        return newDice;
    }

    function rollDice() {
        if (!tenzies) {
            setHasStarted(true);
            setDice((oldDice) =>
                oldDice.map((die) => die.isHeld ? die : generateNewDie())
            );
            setRollCount((prevCount) => prevCount + 1);
        } else {
            setTime(0);
            setTenzies(false);
            setRollCount(1);
            setDice(allNewDice());
        }
    }

    function holdDice(id) {
        setHasStarted(true);
        setDice((oldDice) =>
            oldDice.map((die) => {
                return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
            })
        );
    }

    const diceElements = dice.map((die) => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    ));

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">
                {!tenzies
                    ? "Jogue até que todos o dados estejam iguais. Clique em cada dado para congelar seu valor entre as jogadas!"
                    : "Você ganhou!"}
            </p>
            <div className="dice-container">{diceElements}</div>
            <Timer time={time} />
            <p>N° de jogadas: {rollCount}</p>
            <button className="roll-dice" onClick={rollDice}>
                {tenzies ? "Novo jogo" : "Jogar"}
            </button>
            <BestTime time={bestTime} />
        </main>
    );
}
