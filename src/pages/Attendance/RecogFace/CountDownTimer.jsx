import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ minutes }) => {
    const [timeLeft, setTimeLeft] = useState(minutes * 60);

    useEffect(() => {
        if (timeLeft <= 0) {
            console.log("Time's up!");
            window.close();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    return (
        <div className="row">
            <p className="text-danger">Thời gian còn lại: {formatTime(timeLeft)}</p>
        </div>
    );
};

export default CountdownTimer;
