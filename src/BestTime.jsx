import React from 'react'
import { formatTime } from './utils'

function BestTime({time}) {
    const timer = formatTime(time)

    return (
        <div className='best-time'>
            <p>Recorde: </p>
            <span className='digits'>{timer.minutes}</span>
            <span>:</span>
            <span className='digits'>{timer.seconds}</span>
            <span>:</span>
            <span className='digits'>{timer.miliseconds}</span>
        </div>
    )
}

export default BestTime
