import React, { useEffect, useState } from 'react';
import { courseService } from '../../../services/courseService';
import { attendanceService } from '../../../services/attendanceService';
import AttendanceTable from './AttendanceTable'
function AttendanceManagementContent({ role }) {
    const [courseGroups, setCourseGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('none');
    const [selectedDate, setSelectedDate] = useState('');
    const [attendanceData, setAttendanceData] = useState([]);
    const [allSemester,setAllSemester] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState(undefined);

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
        if (role === 1) {
            const response = await courseService.getAllCourseGroup(selectedSemester);
            console.log("Ad",response);
            if (response.status === 200) {
                setCourseGroups(response.metadata)
            }
        } else {
            
            const response = await courseService.getCourseGroupTeacher(selectedSemester);
            if (response.status === 200) {
                setCourseGroups(response.metadata)
            }
        }
    }
    const handleSelectChange = (event) => {
        setSelectedGroup(event.target.value);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };
    const handleSemesterChange = (event) => {
        setSelectedSemester(event.target.value);
    };
    const handleFetchAttendanceInfo = async (event) => {
        event.preventDefault();
        const response = await attendanceService.getAttendance(selectedGroup, selectedDate);
        setAttendanceData(response.data.data)
    };

    return (
        <main className="py-2 bg-surface-secondary">
            <div className="container">
                <form className="row" onSubmit={handleFetchAttendanceInfo}>
                    <div className="col-4">
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
                        <div className="col-4">
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

                        <div className="col-2">
                            <input
                                type="date"
                                className='form-control'
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                        </div>
                        <button className='btn btn-outline-primary col-2' type='submit'>Tìm kiếm</button></>) : (null)}

                </form>

                <AttendanceTable data={attendanceData} />
            </div>
        </main >

    );
}
export default React.memo(AttendanceManagementContent);
