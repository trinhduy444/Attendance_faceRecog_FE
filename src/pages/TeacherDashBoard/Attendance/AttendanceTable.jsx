import React, { useState, useEffect } from 'react';
import { encodeId } from '../../../utils/secureEncoding';
import * as XLSX from "xlsx"
import { attendanceService } from '../../../services/attendanceService';
import Swal from 'sweetalert2';
import { courseService } from '../../../services/courseService';
const AttendanceTable = ({ data = [], courseGroupId }) => {
    const [editedData, setEditedData] = useState({});
    const [visibleNotes, setVisibleNotes] = useState({});
    const [courseInfo, setCourseInfo] = useState([]);
    const allDates = [
        ...new Set(data.flatMap(student => student.attendances.map(record => record.attend_date_dmy))),
    ];
    useEffect(() => {
        fetchInfoCG(courseGroupId)

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
    const handleChangeStatus = (studentId, date, field, value) => {
        setEditedData(prev => {
            const updatedStudent = prev[studentId] || [];
            const originalRecord = data
                .find(student => student.student_id === studentId)
                ?.attendances.find(record => record.attend_date_dmy === date);

            const existingRecordIndex = updatedStudent.findIndex(record => record.attend_date === originalRecord?.attend_date);

            if (existingRecordIndex >= 0) {
                // Nếu bản ghi đã tồn tại, cập nhật trường thay đổi
                if (field === "attend_yn") {
                    // Cập nhật attend_yn, và xử lý late_yn tương ứng
                    updatedStudent[existingRecordIndex].attend_yn = value ? 1 : 0;
                    updatedStudent[existingRecordIndex].late_yn = (value === 1 && updatedStudent[existingRecordIndex].late_yn) ? updatedStudent[existingRecordIndex].late_yn : 0;
                } else if (field === "late_yn" && value === 1) {
                    // Trường hợp trễ, chỉ cập nhật late_yn thành 1, và attend_yn thành 1
                    updatedStudent[existingRecordIndex].late_yn = 1;
                    updatedStudent[existingRecordIndex].attend_yn = 1;
                } else {
                    // Nếu là ghi chú, chỉ thay đổi ghi chú
                    updatedStudent[existingRecordIndex][field] = value;
                }
            } else if (originalRecord) {
                // Nếu chưa có, thêm mới dựa trên bản gốc
                let attend_yn = 0;
                let late_yn = 0;

                // Xử lý trạng thái attend_yn và late_yn dựa trên field và value
                if (field === "attend_yn") {
                    attend_yn = value ? 1 : 0;
                    late_yn = attend_yn ? 0 : 0; // Nếu attend_yn là 0 thì late_yn cũng phải là 0
                } else if (field === "late_yn" && value === 1) {
                    attend_yn = 1; // Nếu là trễ, attend_yn phải là 1
                    late_yn = 1; // Trễ
                } else if (field === "late_yn" && value === 0) {
                    attend_yn = 1;
                    late_yn = 0;
                }

                updatedStudent.push({
                    attend_date: originalRecord.attend_date,
                    attend_yn: attend_yn,
                    late_yn: late_yn,
                    note: field === "note" ? value : originalRecord.note,
                    enter_time: originalRecord.enter_time, // Giữ nguyên enter_time gốc
                });
            }

            return {
                ...prev,
                [studentId]: updatedStudent,
            };
        });
    };


    const toggleNoteVisibility = (studentId, date) => {
        setVisibleNotes(prev => ({
            ...prev,
            [`${studentId}-${date}`]: !prev[`${studentId}-${date}`],
        }));
    };

    const handleSave = async () => {
        try {
            for (const studentId in editedData) {
                const studentData = editedData[studentId];

                for (const record of studentData) {
                    const requestBody = {
                        studentId: studentId,
                        courseGroupId: courseGroupId,
                        attendDate: record.attend_date,
                        attendYn: record.attend_yn,
                        lateYn: record.late_yn,
                        enterTime: record.enter_time,
                        note: record.note,
                    };

                    await attendanceService.updateAttendance(requestBody);

                }
            }

            // Sau khi lưu thành công, hiển thị thông báo bằng Swal
            Swal.fire({
                icon: 'success',
                title: 'Chỉnh sửa thành công!',
                text: 'Dữ liệu đã được lưu thành công!',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            console.error("Có lỗi xảy ra khi lưu dữ liệu:", error);

            // Hiển thị thông báo lỗi bằng Swal
            Swal.fire({
                icon: 'error',
                title: 'Có lỗi xảy ra!',
                text: 'Không thể lưu dữ liệu. Vui lòng thử lại.',
                confirmButtonText: 'OK'
            });
        }
    };
    const handleExportToExcel = () => {
        // Step 1: Prepare the data
        const dataToExport = data.map((student, studentIndex) => {
            const attendanceData = allDates.reduce((acc, date) => {
                const attendanceRecord = student.attendances.find(record => record.attend_date_dmy === date);
                const editedRecord = editedData[student.student_id]?.find(record => record.attend_date === attendanceRecord?.attend_date);

                const status = attendanceRecord
                    ? editedRecord
                        ? editedRecord.late_yn
                            ? "Trễ"
                            : editedRecord.attend_yn
                                ? "Có mặt"
                                : "Vắng"
                        : attendanceRecord.late_yn
                            ? "Trễ"
                            : attendanceRecord.attend_yn
                                ? "Có mặt"
                                : "Vắng"
                    : "Không có dữ liệu";

                acc[date] = status; // Assign the status for each date
                return acc;
            }, {});
            // // Determine status and add enter time if available
            // let status = "Không có dữ liệu";
            // let enterTime = "";

            // if (attendanceRecord) {
            //     // Check if edited data exists
            //     if (editedRecord) {
            //         enterTime = editedRecord.enter_time || "";  // Use enter_time if exists
            //         status = editedRecord.late_yn
            //             ? `Trễ ${enterTime}`
            //             : editedRecord.attend_yn
            //             ? `Có mặt ${enterTime}`
            //             : `Vắng ${enterTime}`;
            //     } else {
            //         enterTime = attendanceRecord.enter_time || "";  // Use enter_time from attendanceRecord if exists
            //         status = attendanceRecord.late_yn
            //             ? `Trễ ${enterTime}`
            //             : attendanceRecord.attend_yn
            //             ? `Có mặt ${enterTime}`
            //             : `Vắng ${enterTime}`;
            //     }
            // }

            // acc[date] = status; // Assign the status with enter_time
            // return acc;
            // }, {});
            return {
                'STT': studentIndex + 1,
                'MSSV': student.username,
                'Họ Và Tên': student.nickname,
                'Tình trạng': student.ban_yn ? "Cấm thi" : "Bình thường",
                ...attendanceData,
            };
        });

        // Step 2: Create headers
        const headers = [
            'STT',
            'MSSV',
            'Họ Và Tên',
            'Tình trạng',
            ...allDates,
        ];

        // Step 3: Create the worksheet
        const ws = XLSX.utils.aoa_to_sheet([]); // Initialize an empty worksheet
        XLSX.utils.sheet_add_aoa(ws, [[`Dữ liệu điểm danh sinh viên môn: ${courseInfo?.course_name}, nhóm: ${courseInfo?.group_code} ngày ${new Date().toLocaleDateString()}`]], { origin: 'A1' });
        XLSX.utils.sheet_add_aoa(ws, [headers], { origin: 'A2' });
        XLSX.utils.sheet_add_json(ws, dataToExport, { origin: 'A3', skipHeader: true });

        // Step 4: Set column widths for better readability
        const columnWidths = [
            { wch: 5 }, // For STT
            { wch: 15 }, // MSSV
            { wch: 30 }, // Họ Và Tên
            ...allDates.map(() => ({ wch: 10 })), // For each date column
        ];
        ws['!cols'] = columnWidths;

        // Step 5: Merge cells for the title
        ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: headers.length - 1 } }];

        // Step 6: Create workbook and export to file
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Dữ liệu điểm danh');

        const fileName = `Dulieudiemdanh_${courseInfo?.group_code}_${new Date().toISOString().slice(0, 10)}.xlsx`;

        // Step 7: Export to Excel file
        XLSX.writeFile(wb, fileName);
    };


    return (
        <div>
            <div className="row">
                <div className="col-4" id="topData">
                    <h5 className="mb-0">DỮ LIỆU ĐIỂM DANH CỦA TẤT CẢ SINH VIÊN MÔN</h5>
                </div>
                <div className="col-8 d-flex justify-content-evenly">
                    <button className="btn btn-outline-success"
                        onClick={handleExportToExcel}>
                        <i className="bi bi-box-arrow-up-right"></i> Xuất file (excel)
                    </button>
                    <button className="btn btn-primary me-2" onClick={handleSave}>
                        Lưu chỉnh sửa
                    </button>
                </div>

            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col" className="fw-bold">STT</th>
                        <th scope="col" className="fw-bold">MSSV</th>
                        <th scope="col" className="fw-bold">Họ và tên</th>
                        <th scope="col" className="fw-bold">Trạng thái</th>
                        {allDates.map((date, index) => (
                            <th scope="col" className="fw-bold" key={index}>
                                {date}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((student, studentIndex) => (
                        <tr key={studentIndex} className="tr-data">
                            <td>{studentIndex + 1}</td>
                            <td>{student.username}</td>
                            <td>{student.nickname}</td>
                            {student?.ban_yn ? (<td> <a href={`/attendanceData/detail/${encodeURIComponent(encodeId(student.student_id))}/${encodeURIComponent(encodeId(courseGroupId))}`} target="_blank" className="text-danger bi bi-view-stacked" rel="noopener noreferrer">Cấm thi</a></td>
                            ) : <td> <a href={`/attendanceData/detail/${encodeURIComponent(encodeId(student.student_id))}/${encodeURIComponent(encodeId(courseGroupId))}`} target="_blank" className="bi bi-view-stacked text-success" rel="noopener noreferrer">Bình thường</a></td>}
                            {allDates.map((date, dateIndex) => {
                                const attendanceRecord = student.attendances.find(record => record.attend_date_dmy === date);
                                const editedRecord = editedData[student.student_id]?.find(
                                    record => record.attend_date === attendanceRecord?.attend_date
                                );

                                if (attendanceRecord) {
                                    const status = editedRecord
                                        ? editedRecord.late_yn
                                            ? "Trễ"
                                            : editedRecord.attend_yn
                                                ? "Có mặt"
                                                : "Vắng"
                                        : attendanceRecord.late_yn
                                            ? "Trễ"
                                            : attendanceRecord.attend_yn
                                                ? "Có mặt"
                                                : "Vắng";

                                    const noteKey = `${student.student_id}-${date}`;
                                    return (
                                        <td key={dateIndex}>
                                            {/* Select để chỉnh sửa trạng thái */}
                                            <select className='select-Management-Attendances'
                                                value={status}
                                                onChange={e =>
                                                    handleChangeStatus(
                                                        student.student_id,
                                                        date,
                                                        e.target.value === "Trễ" ? "late_yn" : "attend_yn",
                                                        e.target.value !== "Vắng"
                                                    )
                                                }
                                            >
                                                <option value="Có mặt">Có mặt</option>
                                                <option value="Vắng">Vắng</option>
                                                <option value="Trễ">Trễ</option>
                                            </select>

                                            {/* Nút ghi chú */}
                                            <button
                                                className="btn btn-sm btn-outline-info ms-1"
                                                onClick={() => toggleNoteVisibility(student.student_id, date)}
                                            >
                                                {visibleNotes[noteKey] ? "Ẩn" : "Ghi chú"}
                                            </button>

                                            {/* Textarea để hiển thị và chỉnh sửa ghi chú */}
                                            {visibleNotes[noteKey] && (
                                                <textarea
                                                    className="form-control mt-1"
                                                    value={
                                                        editedRecord
                                                            ? editedRecord.note // Ghi chú đã chỉnh sửa
                                                            : attendanceRecord.note || "" // Ghi chú gốc
                                                    }
                                                    onChange={e =>
                                                        handleChangeStatus(student.student_id, date, "note", e.target.value)
                                                    }
                                                ></textarea>
                                            )}
                                        </td>
                                    );
                                } else {
                                    return <td key={dateIndex}>-</td>;
                                }
                            })}

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AttendanceTable;