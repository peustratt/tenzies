import React from "react";
import { formatTime } from "../utils/utils";

function Timer({ time }) {
    const timer = formatTime(time);

    return (
        <div className="timer">
            <span className="digits">{timer.minutes}</span>
            <span>:</span>
            <span className="digits">{timer.seconds}</span>
            <span>:</span>
            <span className="digits">{timer.miliseconds}</span>
        </div>
    );
}

export default Timer;
