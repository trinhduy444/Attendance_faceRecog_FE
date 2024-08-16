import React, { useState, useEffect } from 'react';
import { attendanceService } from '../../../services/attendanceService';
import { convertDay } from '../../../utils/convertDay';
const AttendanceAdjustmentTable = ({ attendanceData }) => {
    const [tableData, setTableData] = useState([]);
    const [inputIndex, setInputIndex] = useState(null);
    const [inputTimer, setInputTimer] = useState(null);
    const [attendDetail, setAttendDetail] = useState({});

    useEffect(() => {
        setTableData(attendanceData);
    }, [attendanceData]);


    const handleInputChange = (student, index, e) => {
        const o = e.target;
        let requestBody = {
            studentId: student.student_id,
            courseGroupId: student.course_group_id,
            attendDate: student.attend_date,
            attendYn: student.attend_yn,
            enterTime: student.enter_time,
            note: student.note
        }

        const data = [...tableData];
        if (o.name === 'note') {
            // Pause sent data to server if user still inputing
            if (inputIndex === index) clearTimeout(inputTimer);
            setInputIndex(index);

            requestBody.note = o.value;
            data[index].note = o.value;

            const newTimer = setTimeout(() => {
                setTableData(data);
                handleUpdateAttendance(requestBody);
            }, 500);
            setInputTimer(newTimer);
        } else if (o.name === 'attend_yn') {
            requestBody.attendYn = o.checked;
            data[index].attend_yn = o.checked;
            setTableData(data);
            handleUpdateAttendance(requestBody);
        }
    }

    // Handle update attendance adjustment to server
    const handleUpdateAttendance = async (requestBody) => {
        attendanceService.updateAttendance(requestBody);
    }

    // View Detail
    const onViewDetail = async (userId, courseGroupId, attenDate) => {
        const response = await attendanceService.getAttendanceDetail(userId, courseGroupId, attenDate)
        if (response.status === 200) {
            setAttendDetail(response.data.metadata)
            console.log(response.data.metadata)
        }
    }
    const handleCloseModel = () => {
        setAttendDetail({})
    }

    return (
        <div>
            {tableData.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr >
                            <th scope="col" className='fw-bold'>STT</th>
                            <th scope="col" className='fw-bold'>MSSV</th>
                            <th scope="col" className='fw-bold'>Họ và tên</th>
                            <th scope="col" className='fw-bold'>Giờ vào lớp</th>
                            <th scope="col" className='fw-bold'>Có mặt</th>
                            <th scope="col" className='fw-bold'>Ghi chú</th>
                            <th scope="col" className='fw-bold'>Xem chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((student, index) => {
                            return (
                                <tr key={index} className='tr-data'>
                                    <td>{index + 1}</td>
                                    <td>{student.username}</td>
                                    <td>{student.nickname}</td>
                                    <td>{student.enter_time}</td>
                                    <td><input name='attend_yn' type="checkbox" checked={student.attend_yn} onChange={(e) => handleInputChange(student, index, e)}></input></td>
                                    <td><input name='note' value={student.note} onChange={(e) => handleInputChange(student, index, e)}></input></td>
                                    <td><a type='button' className="bi bi-view-stacked" data-bs-toggle="modal" data-bs-target="#detailAttendanceModal" onClick={() => onViewDetail(student.student_id, student.course_group_id, student.attend_date)}> Xem</a></td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <tr className='table-primary'>
                                <tf>Tổng: <b className='text-danger'>{tableData.length}</b></tf>
                            </tr>
                        </tr>
                    </tfoot>
                </table>
            ) : (
                <h3 className='fst-italic fw-light text-center mt-20'>Chưa tìm thấy dữ liệu!</h3>
            )}

            {/* <!-- Modal --> */}
            <div className="modal fade" id="detailAttendanceModal" tabIndex="-1"
                aria-labelledby="detailAttendanceModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="detailAttendanceModalLabel">Chi tiết điểm danh | Sinh viên <i className='text-info'>{attendDetail?.nickname}</i> </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h2 className="d-flex justify-content-center text-primary">
                                {attendanceData[0]?.course_name}
                            </h2>

                            <div className="row">
                                <span className="d-flex justify-content-evenly text-start">
                                    <p><b>Trạng thái: </b> {attendDetail?.attend_yn ? 'Có mặt' : 'Vắng'}
                                    </p>
                                    <p><b>Ngày: </b> {convertDay(attendDetail?.attend_date)}
                                    </p>
                                </span>
                                <span className="d-flex justify-content-evenly">
                                    <p><b>Ca học: </b> 01 (6:50 - 9:15)
                                    </p>
                                    <p><b>Giờ điểm danh: </b> {attendDetail?.enter_time === '00:00' ? 'Không điểm danh' : attendDetail.enter_time}
                                    </p>
                                </span>
                            </div>

                            <span className="mb-5 d-flex justify-content-start">
                                <p><b>Ghi chú(nếu có): </b> {attendDetail?.note ? attendDetail.note : 'Không có ghi chú'}
                                </p>
                            </span>
                            <div className="row">
                                <div className="col-6 d-flex justify-content-center">
                                    <img className="img-fluid-attend" src={attendDetail.avatar_path ? attendDetail.avatar_path : "https://via.placeholder.com/150"} alt="Ảnh khuôn mặt gốc" />
                                </div>
                                <div className="col-6 d-flex justify-content-center">
                                    <img className="img-fluid-attend" src={attendDetail.attend_image_path ? attendDetail.attend_image_path : "https://via.placeholder.com/150"} alt="Ảnh khuôn mặt lúc điểm danh" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 d-flex justify-content-center"><i>Ảnh khuôn mặt gốc</i></div>
                                <div className="col-6 d-flex justify-content-center"><i>Ảnh khuôn mặt lúc điểm danh</i></div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModel}>Đóng</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(AttendanceAdjustmentTable);
