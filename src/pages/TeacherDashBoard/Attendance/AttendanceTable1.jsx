import React, { useState, useEffect } from 'react';
import { encodeId } from '../../../utils/secureEncoding';
import * as XLSX from "xlsx"
import { courseService } from '../../../services/courseService';
const AttendanceTable1 = ({ data, courseGroupId }) => {
    const [groupedData, setGroupedData] = useState([]);
    const [dates, setDates] = useState([]);
    const [courseInfo, setCourseInfo] = useState([]);
    useEffect(() => {
        fetchInfoCG(courseGroupId)
        // Nhóm dữ liệu theo sinh viên
        const grouped = groupDataByStudent(data);
        setGroupedData(grouped);
        // Lấy tất cả các ngày có trong dữ liệu
        const uniqueDates = getUniqueDates(data);
        setDates(uniqueDates);
    }, [data]);
    const fetchInfoCG = async (course_group_id) => {
        if (course_group_id === 'none') {
            return
        }
        const response = await courseService.getInfoCourseGroup(course_group_id)
        if (response.status === 200) {
            // console.log(response.metadata)
            setCourseInfo(response.metadata)
        }
    }
    const groupDataByStudent = (data) => {
        const grouped = data.reduce((acc, curr) => {
            const { student_id, username, nickname, attend_date, attend_yn, late_yn } = curr;
            const date = new Date(attend_date).toLocaleDateString();

            if (!acc[username]) {
                acc[username] = { student_id, nickname, attendance: {} };
            }
            acc[username].attendance[date] = attend_yn === undefined
                ? 'Không có dữ liệu'
                : attend_yn === true
                    ? (late_yn === true ? 'Trễ' : 'Đã điểm danh')
                    : 'Vắng';
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
    const handleExportToExcel = () => {
        // Dữ liệu
        const data = groupedData.map((user, index) => {
            const attendanceData = dates.reduce((acc, date) => {
                const attendanceStatus = user.attendance[date];

                // Xác định trạng thái dựa trên attend_yn và late_yn
                acc[date] = attendanceStatus === undefined
                    ? 'Không có dữ liệu'
                    : attendanceStatus === 'Đã điểm danh'
                        ? 'Có mặt'
                        : attendanceStatus === 'Trễ'
                            ? 'Trễ'
                            : 'Vắng';

                return acc;
            }, {});

            return {
                'STT': index + 1,
                'MSSV': user.username,
                'Họ Và Tên': user.nickname,
                ...attendanceData,
            };
        });

        const headers = [
            'STT',
            'MSSV',
            'Họ Và Tên',
            ...dates,
        ];

        const ws = XLSX.utils.aoa_to_sheet([]);
        XLSX.utils.sheet_add_aoa(ws, [[`Dữ liệu điểm danh sinh viên môn: ${courseInfo?.course_name}, nhóm: ${courseInfo?.group_code} ngày ${new Date().toLocaleDateString()}`]], { origin: 'A1' });
        XLSX.utils.sheet_add_aoa(ws, [headers], { origin: 'A2' });
        XLSX.utils.sheet_add_json(ws, data, { origin: 'A3', skipHeader: true });

        const columnWidths = [
            { wch: 5 },
            { wch: 15 }, // MSSV
            { wch: 30 }, // Họ Và Tên
            ...dates.map(() => ({ wch: 10 })), // Width for each date column
        ];
        ws['!cols'] = columnWidths;

        // Merge cells for title
        ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }];

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Dữ liệu điểm danh');

        const fileName = `Dulieudiemdanh${courseInfo?.group_code}_${new Date().toISOString().slice(0, 10)}.xlsx`;

        XLSX.writeFile(wb, fileName);
    };
    return (
        <div>
            {groupedData.length > 0 ? (
                <>
                    <div className="row">
                        <div className="col-9" id='topData'>
                            <h5 className="mb-0">DỮ LIỆU ĐIỂM DANH CỦA TẤT CẢ SINH VIÊN TRONG NHÓM</h5>
                        </div>
                        <button
                            className="col-3 btn btn-outline-success"
                            onClick={handleExportToExcel}

                        >
                            <i className="bi bi-box-arrow-up-right"></i> Xuất file (excel)
                        </button>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr >
                                <th scope="col" className='fw-bold'>STT</th>
                                <th scope="col" className='fw-bold' >MSSV</th>
                                <th scope="col" className='fw-bold'>Họ và tên</th>
                                {dates.map((date, index) => (
                                    <th scope="col" className='fw-bold' key={index}>{date}</th>
                                ))}
                                <th scope="col" className='fw-bold'>Xem chi tiết</th>

                            </tr>
                        </thead>
                        <tbody className='overflow-auto'>
                            {groupedData.map((student, index) => (
                                <tr key={index} className='tr-data'>
                                    <td>{index + 1}</td>
                                    <td>{student.username}</td>
                                    <td>{student.nickname}</td>
                                    {dates.map((date, i) => (
                                        <td
                                            key={i}
                                            className={
                                                student.attendance[date] === 'Đã điểm danh'
                                                    ? 'text-success' // Màu cho đã điểm danh
                                                    : student.attendance[date] === 'Trễ'
                                                        ? 'text-warning' // Màu cho trễ
                                                        : student.attendance[date] === 'Vắng'
                                                            ? 'text-danger' // Màu cho vắng
                                                            : 'text-muted' // Màu cho không có dữ liệu
                                            }
                                        >
                                            {student.attendance[date] || 'Không có dữ liệu'}
                                        </td>

                                    ))}
                                    <td><a href={`/attendanceData/detail/${encodeURIComponent(encodeId(student.student_id))}/${encodeURIComponent(encodeId(data[0].course_group_id))}`} target="_blank" className="bi bi-view-stacked" rel="noopener noreferrer">Xem</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <a href="#topData" className='bi bi-align-top btn btn-outline-primary mt-2'>Lên đầu trang</a>
                </>

            ) : (
                <h3 className='fst-italic fw-light text-center mt-20'>Chưa tìm thấy dữ liệu!</h3>
            )}
        </div>
    );
};

export default React.memo(AttendanceTable1);
