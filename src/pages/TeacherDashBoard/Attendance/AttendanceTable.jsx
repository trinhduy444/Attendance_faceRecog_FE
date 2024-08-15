import React, { useState, useEffect } from 'react';
import { encodeId } from '../../../utils/secureEncoding';
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
            acc[username].attendance[date] = attend_yn === undefined ? 'Không có dữ liệu' : attend_yn === true ? 'Đã điểm danh' : 'Vắng';
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
                                <td><a href={`/attendanceData/detail/${encodeURIComponent(encodeId(student.student_id))}/${encodeURIComponent(encodeId(data[0].course_group_id))}`} target="_blank" className="bi bi-view-stacked" rel="noopener noreferrer">Xem</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h3 className='fst-italic fw-light text-center mt-20'>Chưa tìm thấy dữ liệu!</h3>
            )}
        </div>
    );
};

export default React.memo(AttendanceTable);
