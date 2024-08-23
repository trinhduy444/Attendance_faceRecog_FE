import React, { useEffect, useState } from "react"
import Swal from "sweetalert2"
import '../../../assets/css/adminDashboard.css'
import { courseService } from "../../../services/courseService"
import StudentTable from "./StudentTable"
function StudentManagementContent() {

    const [courseGroups, setCourseGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('none');
    const [allSemester, setAllSemester] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState(undefined);
    const [studentsData, setStudentsData] = useState([]);
    const [courseName, setCourseName] = useState({
        name: "",
        group: "",
        course_group_id: "",
    });
    useEffect(() => {
        fetchSemeter();
    }, []);
    useEffect(() => {
        setCourseGroups([]);
        fetchDataCG();
    }, [selectedSemester]);

    const fetchSemeter = async () => {
        const response = await courseService.getAllSemester();
        if (response.status === 200) {
            setAllSemester(response.metadata)
        }
    }

    const fetchDataCG = async () => {
        const response = await courseService.getCourseGroupTeacher(selectedSemester);
        if (response.status === 200) {
            setCourseGroups(response.metadata)
        }
    }
    const handleSelectChange = (event) => {
        const selectedGroupId = event.target.value;
        
        const selectedGroupData = courseGroups.find(cg => cg.course_group_id == selectedGroupId);
        setSelectedGroup(selectedGroupId);
        setCourseName({
            ...courseName,
            name: selectedGroupData?.course_name,
            group: selectedGroupData?.group_code,
            course_group_id: selectedGroupData?.course_group_id
        });
    };


    const handleSemesterChange = (event) => {
        setSelectedSemester(event.target.value);
    };
    const handleFetchStudentsInfo = async (event) => {
        event.preventDefault();
        if (selectedGroup === 'none') {
            Swal.fire("Cảnh báo!", "Bạn vui lòng chọn nhóm lớp!", "warning")
            return
        }
        const response = await courseService.viewAllStudentCourseGroupByTeacher(1, parseInt(selectedGroup))
        if (response.status === 200) {
            // console.log(response.metadata)
            setStudentsData(response.metadata)
        } else {
            Swal.fire("Cảnh báo!", "Bạn vui lòng chọn đúng thông tin", "warning")
            return;
        }
    };
    return (
        <div className="container">

            <div className="row">
                <form className="row" onSubmit={handleFetchStudentsInfo}>
                    <div className="col-5">
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            value={selectedSemester}
                            onChange={handleSemesterChange}
                        >
                            <option value=''>Chọn học kỳ - năm học</option>
                            {allSemester.length > 0 && allSemester.map((semester, index) => (
                                <option key={index} value={semester.semester_year_id}>--- {semester.semester_year_name} ---</option>
                            ))}
                        </select>
                    </div>
                    {selectedSemester ? (<>
                        <div className="col-5">
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                value={selectedGroup}
                                onChange={handleSelectChange}
                            >
                                <option value='none'>Chọn nhóm lớp</option>
                                {courseGroups.length > 0 && courseGroups.map((cg, index) => (
                                    <option key={index} value={cg.course_group_id}>{cg.course_name} | {cg.group_code}</option>
                                ))}
                            </select>
                        </div>

                        <button className='btn btn-outline-primary col-2' type='submit'>Tìm kiếm</button></>) : (null)}

                </form>
            </div>
            {studentsData.length > 0 ? (<StudentTable studentsData={studentsData} courseName={courseName} />
            ) : (
                <div className="row">
                    <h3 className='fst-italic fw-light text-center mt-20'>Không tìm thấy dữ liệu!</h3>

                </div>
            )}
        </div>
    );
}
export default React.memo(StudentManagementContent);
