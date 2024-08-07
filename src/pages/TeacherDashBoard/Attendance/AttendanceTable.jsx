import React, { useState, useEffect } from 'react';

const AttendanceTable = ({ data }) => {
    const [groupedData, setGroupedData] = useState([]);
    const [dates, setDates] = useState([]);

    useEffect(() => {
        // Nhóm dữ liệu theo sinh viên
        const grouped = groupDataByStudent(data);
        setGroupedData(grouped);

        // Lấy tất cả các ngày có trong dữ liệu
        const uniqueDates = getUniqueDates(data);
        setDates(uniqueDates);
    }, [data]);

    const groupDataByStudent = (data) => {
        const grouped = data.reduce((acc, curr) => {
            const { student_id, username, nickname, attend_date, attend_yn } = curr;
            const date = new Date(attend_date).toLocaleDateString();
    
            if (!acc[username]) {
                acc[username] = { student_id, nickname, attendance: {} };
            }
            acc[username].attendance[date] = attend_yn === true ? 'Đã điểm danh' : 'Vắng';
    
            return acc;
        }, {});
    
        return Object.entries(grouped).map(([username, info]) => ({
            student_id: info.student_id,
            username,
            nickname: info.nickname,
            attendance: info.attendance
        }));
    };
    const getUniqueDates = (data) => {
        const dates = data.map(d => new Date(d.attend_date).toLocaleDateString());
        return [...new Set(dates)];
    };
    const onViewDetail = (student_id, course_group_id) => {
        console.log(student_id, course_group_id)
    }

    return (
        <div>
            {groupedData.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr >
                            <th scope="col" className='fw-bold'>MSSV</th>
                            <th scope="col" className='fw-bold'>Họ và tên</th>
                            {dates.map((date, index) => (
                                <th scope="col" className='fw-bold' key={index}>{date}</th>
                            ))}
                            <th scope="col" className='fw-bold'>Xem chi tiết</th>

                        </tr>
                    </thead>
                    <tbody className='overflow-auto'>
                        {groupedData.map((student, index) => (
                            <tr key={index}>
                                <td>{student.username}</td>
                                <td>{student.nickname}</td>
                                {dates.map((date, i) => (
                                    <td key={i} className={student.attendance[date] === 'Đã điểm danh' ? 'text-success' : 'text-danger'}>
                                        {student.attendance[date] || 'Không có dữ liệu'}
                                    </td>

                                ))}
                                <td><a type='button' className="bi bi-view-stacked"  data-bs-toggle="modal" data-bs-target="#detailAttendance" onClick={() => onViewDetail(student.student_id, data[0].course_group_id)}> Xem</a></td>
                            </tr>
                        ))}
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

export default React.memo(AttendanceTable);
