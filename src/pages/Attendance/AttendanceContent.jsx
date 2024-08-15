import React, { useEffect, useState } from 'react';
import { courseService } from '../../services/courseService';
import { encodeId } from '../../utils/secureEncoding';
function AttendanceContent() {
    // Semester
    const [allSemester, setAllSemester] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState(undefined);
    const [allCourseGroup, setAllCourseGroup] = useState([]);
    const fetchSemeter = async () => {
        const response = await courseService.getAllSemester();
        if (response.status === 200) {
            setAllSemester(response.metadata)
        }
    }
    useEffect(() => { fetchSemeter() }, []);
    function handleSelectSemester(e) {
        setSelectedSemester(e.target.value);
        fetchCourseGroupInfo(selectedSemester);
    }
    const fetchCourseGroupInfo = async (semester_year_id) => {
        const response = await courseService.getCourseGroupStudent(semester_year_id);
        if (response.status === 200) {
            setAllCourseGroup(response.metadata);
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
                                value={selectedSemester}
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
                        <div className="form-group">
                            <select id="selectSubject" className="form-select" data-live-search="true">
                                <option defaultValue={'none'}>--Chọn môn học cần xem dữ liệu điểm danh--</option>
                                <option value="2">Lập trình hướng đối tượng</option>
                                <option value="3">Kiến trúc hướng dịch vụ</option>
                                <option value="4">Mẫu thiết kế</option>
                            </select>
                        </div>
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
                                {/* <tr>
                                    <th scope="row">Lập trình hướng đối tượng (300201) | N01</th>
                                    <td>Ca: 1 | Tuần: 6,7,8...10,11</td>
                                    <td className="text-warning">Bình thường</td>
                                    <td>0</td>
                                    <td><a href="/attendance/detail">Xem chi tiết</a></td>
                                </tr>
                                <tr>
                                    <th scope="row">Mẫu thiết kế (400201) | N02</th>
                                    <td>Ca: 2 | Tuần: 6,7,8...10,11</td>
                                    <td className="text-danger">Cấm thi</td>
                                    <td>4</td>
                                    <td><a href="">Xem chi tiết</a></td>
                                </tr>
                                <tr>
                                    <th scope="row">Khóa luận tốt nghiệp (500686) | N01</th>
                                    <td>None</td>
                                    <td className="text-success">Đã hoàn thành</td>
                                    <td>0</td>
                                    <td><a href="">Xem chi tiết</a></td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </main>

    );
}
export default React.memo(AttendanceContent);
