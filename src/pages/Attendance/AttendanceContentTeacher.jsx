import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import { courseService } from '../../services/courseService';
import { encodeId } from '../../utils/secureEncoding';
import Swal from 'sweetalert2';
import { formatDate } from '../../utils/convertDay'
import { requestService } from '../../services/requestService';

function AttendanceContent({ userId }) {

    // Semester
    const [allSemester, setAllSemester] = useState([]);
    const [allCourseGroup, setAllCourseGroup] = useState([]);

    const fetchSemeter = async () => {
        const response = await courseService.getAllSemester();
        if (response.status === 200) {
            setAllSemester(response.metadata)
        } else {
            Swal.fire("Thất bại!", "Vui lòng thử lại sau!", "error")
            return
        }
    }

    useEffect(() => { fetchSemeter() }, []);

    function handleSelectSemester(e) {
        fetchCourseGroupInfo(e.target.value);
    }

    const fetchCourseGroupInfo = async (semester_year_id) => {
        const response = await courseService.getCourseGroupTeacher(semester_year_id);
        console.log("Dataaaa", response.metadata);
        if (response.status === 200) {
            setAllCourseGroup(response.metadata);
        } else {
            Swal.fire("Thất bại!", "Có lỗi xảy ra, vui lòng thử lại!", "error");
        }
    };

    return (
        <main className="py-6 bg-surface-secondary">
            <div className="container">
                <div className="row">
                    <div className="col-7">
                        <div className="form-group">
                            <select id="selectSemester" data-live-search="true"
                                className="form-select border border-black"
                                aria-label="Default select example"
                                onChange={handleSelectSemester}
                            >
                                <option value=''>--Chọn học kỳ | Choose semester--</option>

                                {allSemester.length > 0 && allSemester.map((semester, index) => (
                                    <option key={index} value={semester.semester_year_id}>--- {semester.semester_year_name} ---</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-5">

                    </div>

                </div>
                <div className="row mt-4">
                    <div className="col-12">
                        <table className="table table-striped border">
                            <thead>
                                <tr>
                                    <th scope="col" ><p className="fw-bold">Môn học</p></th>
                                    <th scope="col">Lịch học</th>
                                    <th scope="col">Số lượng sinh viên</th>
                                    <th scope="col">Quản lý dữ liệu</th>
                                    <th scope="col">Điều chỉnh dữ liệu theo ngày</th>
                                    <th scope="col">Mở đường dẫn điểm danh</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allCourseGroup.map((courseGroup, index) => (<tr key={index}>
                                    <th scope="row">{courseGroup.course_name} ({courseGroup.course_code}) | {courseGroup.group_code}</th>
                                    <td>Thứ: {courseGroup.week_day} | Ca: {courseGroup.shift_code.slice(2)} | Tuần: {courseGroup.week_from} ... {courseGroup.week_to}</td>
                                    <td>{courseGroup.total_student_qty} Sinh viên</td>
                                    <td><a href={`/attendance/management/${encodeURIComponent(encodeId(courseGroup.course_group_id))}`}>Quản lý dữ liệu</a></td>
                                    <td><a
                                        href='/attendance/adjustment'
                                        target="_blank">
                                        Điều chỉnh dữ liệu
                                    </a></td>
                                    <td><a
                                        href={`/attendRecog/${encodeURIComponent(encodeId(courseGroup.course_group_id))}`}
                                        target="_blank">
                                        Mở đường dẫn điểm danh
                                    </a></td>


                                </tr>))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </main>

    );
}
export default React.memo(AttendanceContent);
