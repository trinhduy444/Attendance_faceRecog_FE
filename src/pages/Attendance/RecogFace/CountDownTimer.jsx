import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const CountdownTimer = ({ minutes }) => {
    const [timeLeft, setTimeLeft] = useState(minutes * 60);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (timeLeft <= 0) {
            window.close();
            return;
        }

        if (timeLeft === 30 && !showAlert) {
            setShowAlert(true);
            Swal.fire({
                title: 'Cảnh báo!',
                text: 'Cửa sổ sẽ đóng sau 30 giây.',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            }).then(() => {
                setShowAlert(false); // Reset showAlert để có thể sử dụng lại nếu cần
            });
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, showAlert]);

    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    return (
        <div className="row">
            <p>Thời gian còn lại: <i className="text-danger">{formatTime(timeLeft)}</i></p>
        </div>
    );
};

export default CountdownTimer;
