import React from 'react'

function Timer({time}) {

    function padDigits(number, requiredDigits) {
        let numberStr = number.toString()
        if (numberStr.length >= requiredDigits) {return number} 
        return "0".repeat(requiredDigits - numberStr.length) + number
    }

    const timer = {
        minutes: padDigits(Math.floor(time / 60000), 2),
        seconds: padDigits(Math.floor((time / 1000) % 60), 2),
        miliseconds: padDigits(Math.floor(((time / 10) % 100)), 2)
    }

    return (
        <div className='timer'>
            <span>Minutes {timer.minutes}</span>
            <span>Seconds {timer.seconds}</span>
            <span>Miliseconds {timer.miliseconds}</span>
        </div>
    )
}

export default Timer
