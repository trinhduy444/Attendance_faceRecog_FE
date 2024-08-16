import React, { useState, useEffect } from 'react';
import { attendanceService } from '../../../services/attendanceService';

const AttendanceAdjustmentTable = ({ attendanceData }) => {
    const [tableData, setTableData] = useState([]);
    const [inputIndex, setInputIndex] = useState(null);
    const [inputTimer, setInputTimer] = useState(null);

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

    const onViewDetail = (student_id, course_group_id) => {
        console.log(student_id, course_group_id)
    }

    return (
        <div>
            {tableData.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col" className='fw-bold'>MSSV</th>
                            <th scope="col" className='fw-bold'>Họ và tên</th>
                            <th scope="col" className='fw-bold'>Giờ vào lớp</th>
                            <th scope="col" className='fw-bold'>Có mặt</th>
                            <th scope="col" className='fw-bold'>Ghi chú</th>
                            {/* <th scope="col" className='fw-bold'>Xem chi tiết</th> */}
                        </tr>
                    </thead>
                    <tbody className='overflow-auto'>
                        {tableData.map((student, index) => {
                            return (
                                <tr key={index}>
                                    <td>{student.username}</td>
                                    <td>{student.nickname}</td>
                                    <td>{student.enter_time}</td>
                                    <td><input name='attend_yn' type="checkbox" checked={student.attend_yn} onChange={(e) => handleInputChange(student, index, e)}></input></td>
                                    <td><input name='note' value={student.note} onChange={(e) => handleInputChange(student, index, e)}></input></td>
                                    {/* <td><a type='button' className="bi bi-view-stacked"  data-bs-toggle="modal" data-bs-target="#detailAttendance" onClick={() => onViewDetail(student.student_id, data[0].course_group_id)}> Xem</a></td> */}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            ) : (
                <h3 className='fst-italic fw-light text-center mt-20'>Chưa tìm thấy dữ liệu!</h3>
            )}

            <div className="modal fade" id="detailAttendance" tabIndex="-1"
                aria-labelledby="detailAttendanceLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="detailAttendanceLabel">Chi tiết thông báo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                           
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(AttendanceAdjustmentTable);
