import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { courseService } from '../../../services/courseService';
import Swal from 'sweetalert2';
function RecogFaceContent({ course_group_id, minutes }) {

    // console.log('RecogFaceContent', course_group_id,minutes)
    const [courseGroupInfo, setCourseGroupInfo] = useState(null);
    const [attendListSuccess, setAttendListSuccess] = useState(['52000655', '52000705', '52000655', '52000705', '52000655', '52000705', '52000655', '52000705', '52000655', '52000705', '52000655', '52000705', '52000655', '52000705', '52000655', '52000705', '52000655', '52000705', '52000655', '52000705', '52000655', '52000705', '52000655', '52000705', '52000655', '52000705', '52000655', '52000705', '52000655', '52000705']);
    const [timeLeft, setTimeLeft] = useState(minutes * 60);

    useEffect(() => {
        handleFetchCourseGroupInfo(course_group_id);

        // Countdown timer logic
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        const timeout = setTimeout(() => {
            Swal.fire("Hết thời gian", "Thời gian điểm danh đã hết!", "warning")
            window.close();
        }, minutes* 60 * 1000);

        return () => {
            clearInterval(timer);
            clearTimeout(timeout);
        };
    }, []);
    const handleFetchCourseGroupInfo = async (course_group_id) => {
        const response = await courseService.getInfoCourseGroup(course_group_id);
        // console.log(response.metadata)
        setCourseGroupInfo(response.metadata);
    };
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };
    return (
        <main className="py-6 bg-primary">
            <div className="container">
                <div className="row">
                    <div className="col-8" style={{ height: '90vh' }}>
                        <Webcam style={{ width: '100%', height: '100%' }} />
                    </div>
                    <div className="col-4">
                        <div className="row courseGroupInfoAttend">
                            <p>Môn: <strong className='text-success'>{courseGroupInfo?.course_name}</strong> | Nhóm: {courseGroupInfo?.group_code}</p>
                            <p>Giảng viên: {courseGroupInfo?.nickname}</p>
                        </div>
                        <div className="row attendListSuccess">
                            <p className='fst-italic'>Danh sách sinh viên điểm danh thành công: </p>
                            <div className='overflow-auto mt-2 border border-info' style={{ height: '500px' }}>
                                <ul className='m-1'>
                                    {attendListSuccess.map((mssv, index) => (
                                        <li key={index}>{mssv}</li>
                                    ))}

                                </ul>
                            </div>
                        </div>
                        <div className="row">
                            <p className="text-danger">Thời gian còn lại: {formatTime(timeLeft)}</p>

                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
export default React.memo(RecogFaceContent);
