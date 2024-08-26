import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const CountdownTimer = ({ minutes }) => {
    const [timeLeft, setTimeLeft] = useState(minutes * 60);
    const [showAlert, setShowAlert] = useState(false);
    const [isLate, setIsLate] = useState(false);

    useEffect(() => {
        const totalCountdown = (20 - minutes) * 60;

        if (timeLeft <= -totalCountdown) {
            window.close();
            return;
        }

        if (timeLeft === 30 && !showAlert) {
            setShowAlert(true);
            Swal.fire({
                title: 'Cảnh báo!',
                text: 'Thời gian điểm danh đúng giờ còn 30 giây.',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            }).then(() => {
                setShowAlert(false);
            });
        }

        if (timeLeft <= 0 && !isLate) {
            setIsLate(true);
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, showAlert, isLate]);

    const formatTime = (seconds) => {
        const sign = seconds < 0 ? '-' : '';
        const absSeconds = Math.abs(seconds);
        const min = Math.floor(absSeconds / 60);
        const sec = absSeconds % 60;
        return `${sign}${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    return (
        <div className="row">
            <p>Thời gian còn lại: <i className={`text-${isLate ? 'secondary' : 'danger'}`}>{formatTime(timeLeft)}</i></p>
        </div>
    );
};

export default CountdownTimer;
