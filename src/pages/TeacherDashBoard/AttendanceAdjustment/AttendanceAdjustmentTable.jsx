import React, { useState, useEffect } from 'react';
import * as XLSX from "xlsx"
import Chart2 from '../Chart/Chart2'
import { attendanceService } from '../../../services/attendanceService';
import { convertDay } from '../../../utils/convertDay';
const AttendanceAdjustmentTable = ({ attendanceData, disabledTable }) => {
    const [tableData, setTableData] = useState([]);
    const [attendDetail, setAttendDetail] = useState({});

    const [inputIndex, setInputIndex] = useState(null);
    const [inputTimer, setInputTimer] = useState(null);

    const [disabled, setDisabled] = useState(false);
    useEffect(() => {
        setTableData(attendanceData);
    }, [attendanceData]);

    useEffect(() => {
        setDisabled(disabledTable);
    }, [disabledTable])
    const barAndPieData = [
        { name: 'Present', value: 40 },
        { name: 'Late', value: 15 },
        { name: 'Absent', value: 5 }
    ];
    const data = [
        { name: 'Week 1', present: 40, late: 15, absent: 5 },
        { name: 'Week 2', present: 35, late: 10, absent: 10 },
        { name: 'Week 3', present: 50, late: 5, absent: 5 },
        { name: 'Week 4', present: 45, late: 10, absent: 5 },
      ];
      
    const handleInputChange = (student, index, e) => {
        const o = e.target;
        let requestBody = {
            studentId: student.student_id,
            courseGroupId: student.course_group_id,
            attendDate: student.attend_date,
            attendYn: student.attend_yn,
            lateYn: student.late_yn,
            enterTime: student.enter_time,
            note: student.note
        }

        const data = [...tableData];
        switch (o.name) {
            case 'note':
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
                break;
            case 'attend_yn':
                requestBody.attendYn = o.checked;
                data[index].attend_yn = o.checked;
                setTableData(data);
                handleUpdateAttendance(requestBody);
                break;
            case 'late_yn':
                requestBody.lateYn = o.checked;
                data[index].late_yn = o.checked;
                setTableData(data);
                handleUpdateAttendance(requestBody);
                break;
            default:
                break;
        }
    }

    // Handle update attendance adjustment to server
    const handleUpdateAttendance = async (requestBody) => {
        console.log(requestBody)
        attendanceService.updateAttendance(requestBody);
    }

    // View Detail
    const onViewDetail = async (userId, courseGroupId, attenDate) => {
        const response = await attendanceService.getAttendanceDetail(userId, courseGroupId, attenDate)
        if (response.status === 200) {
            setAttendDetail(response.data.metadata)
        }
    }
    const handleCloseModel = () => {
        setAttendDetail({})
    }

    // Export 
    const handleExportToExcel = () => {
        // Dữ liệu
        const data = attendanceData.map(student => ({
            'MSSV': student.username,
            'Họ Và Tên': student.nickname,
            'Trạng thái': student.attend_yn === true ? 'Có mặt' : 'Vắng',
            'Giờ vào lớp': student.enter_time,
            'Ghi chú': student.note
        }));

        // Define headers
        const headers = [
            'MSSV',
            'Họ Và Tên',
            'Trạng thái',
            'Giờ vào lớp',
            'Ghi chú'
        ];

        const ws = XLSX.utils.aoa_to_sheet([]);
        XLSX.utils.sheet_add_aoa(ws, [[`Dữ liệu điểm danh môn ${attendanceData[0]?.course_name}, ngày: ${attendanceData[0].attend_date_dmy}`]], { origin: 'A1' });
        XLSX.utils.sheet_add_aoa(ws, [headers], { origin: 'A2' });
        XLSX.utils.sheet_add_json(ws, data, { origin: 'A3', skipHeader: true });

        const columnWidths = [
            { wch: 15 },
            { wch: 30 },
            { wch: 10 },
            { wch: 10 },
            { wch: 50 },

        ];
        ws['!cols'] = columnWidths;

        // Merge cells for title
        ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }];

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Dữ liệu điểm danh');

        const fileName = `Dulieudiemdanh_${new Date().toISOString().slice(0, 10)}.xlsx`;

        XLSX.writeFile(wb, fileName);
    };

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
                            <th scope="col" className='fw-bold'>Trễ</th>
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
                                    <td><input name='attend_yn' type="checkbox" disabled={disabled} checked={student.attend_yn} onChange={(e) => handleInputChange(student, index, e)}></input></td>
                                    <td><input name='late_yn' type="checkbox" disabled={disabled} checked={student.late_yn} onChange={(e) => handleInputChange(student, index, e)}></input></td>
                                    <td><input name='note' disabled={disabled} value={student.note} onChange={(e) => handleInputChange(student, index, e)}></input></td>
                                    <td><a type='button' className="bi bi-view-stacked" data-bs-toggle="modal" data-bs-target="#detailAttendanceModal" onClick={() => onViewDetail(student.student_id, student.course_group_id, student.attend_date)}> Xem</a></td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>
                                <button
                                    className="btn btn-outline-success"
                                    onClick={handleExportToExcel}
                                 >
                                    <i className="bi bi-box-arrow-up-right"></i> Xuất file (excel)
                                </button>
                            </th>
                            <th>
                                <button
                                    className="btn btn-outline-info "
                                    data-bs-toggle='modal'
                                    data-bs-target='#statistical'
                                >
                                    <i className="bi bi-bar-chart"></i> Xem thống kê
                                </button>
                            </th>

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
            {/* <!-- Modal --> */}
            <div className="modal fade" id="statistical" tabIndex="-1"
                aria-labelledby="statistical" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="statistical">Thống kê dữ liệu điểm danh <i className='text-info'>{attendDetail?.nickname}</i> </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Chart2 data={data} type="bar" />

                            <Chart2 data={barAndPieData} type="pie" />

                            {/* <Chart2 data={heatmapData} type="heatmap" /> */}

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Đóng</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(AttendanceAdjustmentTable);
