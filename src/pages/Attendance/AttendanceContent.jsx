import React, { useEffect, useState } from 'react';
import { courseService } from '../../services/courseService';
import { encodeId } from '../../utils/secureEncoding';
import Swal from 'sweetalert2';

function AttendanceContent() {
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
        const response = await courseService.getCourseGroupStudent(semester_year_id);
        if (response.status === 200) {
            setAllCourseGroup(response.metadata);
        } else {
            Swal.fire("Thất bại!", "Vui lòng thử lại sau!", "error")
            return
        }

    }

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
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col" ><p className="fw-bold">Môn học</p></th>
                                    <th scope="col">Lịch học</th>
                                    <th scope="col">Tình trạng</th>
                                    <th scope="col">Tổng vắng</th>
                                    <th scope="col">Chi tiết</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allCourseGroup.map((courseGroup, index) => (
                                    <tr key={index}>
                                        <th scope="row">{courseGroup.course_name} ({courseGroup.course_code}) | {courseGroup.group_code}</th>
                                        <td>Ca: {courseGroup.shift_code.slice(2)} | Tuần: {courseGroup.week_from} ... {courseGroup.week_to}</td>
                                        <td className={
                                            courseGroup.status === false ? "text-success" :
                                                courseGroup.ban_yn === false ? "text-warning" :
                                                    "text-danger"
                                        }>
                                            {
                                                courseGroup.status === false ? "Đã hoàn thành" :
                                                    courseGroup.ban_yn === false ? "Bình thường" :
                                                        "Cấm thi"
                                            }
                                        </td>

                                        <td>{courseGroup.total_absent}</td>
                                        <td><a href={`/attendance/detail/${encodeURIComponent(encodeId(courseGroup.course_group_id))}/${encodeURIComponent(courseGroup.ban_yn)}`}>Xem chi tiết</a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </main>

    );
}
export default React.memo(AttendanceContent);
