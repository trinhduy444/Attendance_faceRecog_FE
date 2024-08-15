import React, { useEffect, useState } from 'react';
import { courseService } from '../../../services/courseService';
import { attendanceService } from '../../../services/attendanceService';
import AttendanceChart from '../Chart/AttendanceChart'
import { convertDay } from '../../../utils/convertDay';
import moment from 'moment';
function AttendanceDetailContent({ student_id, course_group_id }) {
    const [attenDetails, setAttendDetails] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);

    useEffect(() => {
        onViewDetail(student_id, course_group_id)
    }, [])
    const onViewDetail = async (student_id, course_group_id) => {
        try {
            const response = await attendanceService.getAttendanceDetail(student_id, course_group_id, null);
            if (response.status === 200) {
                setAttendDetails(response.data.metadata)
                const formattedData = response.data.metadata.map(item => ({
                    date: moment(item.attend_date).format('DD-MM-YYYY'),
                    attended: item.attend_yn ? 1 : 0,
                }));
                setAttendanceData(formattedData);
            }
        } catch (error) {
            console.error('Error fetching attendance details:', error);
        }
    };
    return (
        <main className="container py-2">
            <section className="row bg-section p-2" id='top'>
                <div className="card col-6 pt-2 mt-2">
                    <AttendanceChart data={attendanceData} type={'line'} />
                    <div className="card-body text-center">
                        <p className='card-text'>Biểu đổ line chart thể hiện tình trạng đi học của sinh viên
                        </p>
                    </div>
                </div>
                <div className="card col-6 pt-2 mt-2">
                    <AttendanceChart data={attendanceData} type={'bar'} />
                    <div className="card-body text-center">
                        <p className='card-text'>Biểu đổ bar chart thể hiện tình trạng đi học của sinh viên
                        </p>
                    </div>
                </div>
            </section>
            <section className="middle row bg-section p-2">

                <div className="col-8 mt-3" >
                    {attenDetails.map((attend, index) => (
                        <div className="card m-2" key={index}>
                            <div className="row">
                                <div className="col-6 text-center p-2">
                                    <img className="img-attenđetail" src={attend.attend_image_path ? attend.attend_image_path : "https://via.placeholder.com/150"} alt="Ảnh điểm danh" />
                                </div>
                                <div className="col-6">
                                    {attend.attend_yn === false ? (<p className='text-center text-danger'>Sinh viên vắng</p>
                                    ) : (<span>
                                        <p className='text-center text-success'>Ngày {convertDay(attend.attend_date)}</p>
                                        <b className='bi bi-alarm'> Giờ điểm danh: <i className='fw-light'>{attend?.enter_time}</i></b>
                                        <br />
                                        <b className='bi bi-journal-code'> Ghi chú: <i className='fw-light'>{attend.note ? attend.note : 'Không có ghi chú'}</i></b>
                                        <br />
                                    </span>
                                    )}
                                    <a type='button' className='btn btn-warning'>Chỉnh sửa</a>

                                </div>
                            </div>

                        </div>

                    ))}

                </div>
                <div className="col-4 text-center card mt-3">
                    <p ><i>Khuôn mặt gốc</i></p>

                    <img src={attenDetails[0]?.avatar_path ? attenDetails[0].avatar_path : "https://via.placeholder.com/450"} alt="" />

                </div>
            </section>
            <a href="#top" className='bi bi-align-top btn btn-primary mt-2'>Lên đầu trang</a>
        </main >

    );
}
export default React.memo(AttendanceDetailContent);