import React from "react"

const diceSyle = [
{
    
}
]

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
           <span></span>
           <span></span>
           <span></span>
           <span></span>
           <span></span>
           <span></span>
           <span></span>
        </div>
    )
}