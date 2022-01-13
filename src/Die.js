import React from "react"

const dicePattern = [
    [2],
    [3, 6],
    [1, 2, 7],
    [1, 3, 6, 7],
    [1, 2, 3, 6, 7],
    [1, 3, 4, 5, 6, 7]
]

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }



    const dotsEl = [1,2,3,4,5,6,7].map((dot) => {
        let indexDado = props.value - 1

        return <span style={dicePattern[indexDado].includes(dot) ? {backgroundColor: "black"} : {backgroundColor: "transparent"}}></span>
    })
    return (
        <div
            className="die-face"
            style={styles}
            onClick={props.holdDice}
        >
            {dotsEl}
        </div>
    )
}
