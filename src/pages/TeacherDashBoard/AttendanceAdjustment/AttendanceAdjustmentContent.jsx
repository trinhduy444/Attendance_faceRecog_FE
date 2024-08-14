import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2"
import { courseService } from '../../../services/courseService';
import { attendanceService } from '../../../services/attendanceService';
import AttendanceAdjustmentTable from './AttendanceAdjustmentTable'
function AttendanceAdjustmentContent({ role }) {
    // Semester State
    const [allSemester, setAllSemester] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState(undefined);
    // Course State
    const [courseGroups, setCourseGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('none');
    // Date State
    const [selectedDate, setSelectedDate] = useState('');
    // Table data State
    const [attendanceData, setAttendanceData] = useState([]);

    const [showButton, setShowButton] = useState(false);
    const [disableFilter, setDisableFilter] = useState(false);

    useEffect(() => {
        fetchSemeter();
    }, []);
    useEffect(() => {
        setCourseGroups([]);
        fetchDataCG();
    }, [selectedSemester]);

    // Fetch list of semester
    const fetchSemeter = async () => {
        const response = await courseService.getAllSemester();
        if (response.status === 200) {
            setAllSemester(response.metadata)
        }
    }

    // Fetch list of course group base on role and semester
    const fetchDataCG = async () => {
        if (role === 1) {
            const response = await courseService.getAllCourseGroup(selectedSemester);
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

    // Handle input
    const handleSelectChange = (event) => {
        setSelectedGroup(event.target.value);
    };
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };
    const handleSemesterChange = (event) => {
        setSelectedSemester(event.target.value);
    };

    // Handle filter submit
    const handleFetchAttendanceInfo = async (event) => {
        event.preventDefault();
        if (selectedGroup === 'none' || selectedDate === '') {
            Swal.fire({
                title: 'Điều kiện lọc không được bỏ trống!',
                icon: 'warning'
            });
            return;
        }

        handleUpdateAttendanceFromRawData(false);
        const response = await attendanceService.getAttendance(selectedGroup, selectedDate);
        setAttendanceData(response.data.data);
        setShowButton(true);
        setDisableFilter(true);
    };

    // Handle pull attendance data from raw data
    const handleUpdateAttendanceFromRawData = async (forceUpdate) => {
        const requestBody = {
            courseGroupId: selectedGroup,
            attendDate: selectedDate,
            forceUpdate: forceUpdate
        };
        await attendanceService.updateAttendanceFromRawData(requestBody);
    }
    // Handle finish update data
    const handleFinishUpdate = async () => {
        setAttendanceData([]);
        setShowButton(false);
        setDisableFilter(false);
    };

    // Handle repull attendance data from raw data
    const handleRepullAttendance = async () => {
        Swal.fire({
            title: `Bạn có chắc muốn kéo lại dữ liệu điểm danh của nhóm môn với ngày đang lọc?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
                handleUpdateAttendanceFromRawData(true);
                const response = await attendanceService.getAttendance(selectedGroup, selectedDate);
                setAttendanceData(response.data.data);
                console.log(attendanceData)
            }
        });
    }

    // Handle delete attendance data
    const handleDeleteAttendance = async () => {
        Swal.fire({
            title: `Bạn có chắc muốn xóa dữ liệu điểm danh của nhóm môn với ngày đang lọc?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const requestBody = {
                    studentId: -1,
                    courseGroupId: selectedGroup,
                    attendDate: selectedDate
                }
                attendanceService.deleteAttendance(requestBody);
                setAttendanceData([]);
                setShowButton(false);
                setDisableFilter(false);
            }
        });
    }

    return (
        <main className="py-2 bg-surface-secondary">
            <div className="container">
                <form className="row" onSubmit={handleFetchAttendanceInfo}>
                    <div className="col-4">
                        <select className="form-select" aria-label="Default select example" disabled={disableFilter} value={selectedSemester} onChange={handleSemesterChange}>
                            <option value=''>Chọn học kỳ - năm học</option>
                            {allSemester.length > 0 && allSemester.map((semester, index) => (
                                <option key={index} value={semester.semester_year_id}>--- {semester.semester_year_name} ---</option>
                            ))}
                        </select>
                    </div>
                    {selectedSemester ? (<>
                        <div className="col-4">
                            <select className="form-select" aria-label="Default select example" disabled={disableFilter} value={selectedGroup} onChange={handleSelectChange}>
                                <option value='none'>Chọn nhóm lớp</option>
                                {courseGroups.length > 0 && courseGroups.map((cg, index) => (
                                    <option key={index} value={cg.course_group_id}>{cg.course_name} | {cg.group_code}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-2">
                            <input type="date" className='form-control' disabled={disableFilter} value={selectedDate} onChange={handleDateChange}/>
                        </div>
                        <button className='btn btn-outline-primary col-2' disabled={disableFilter} type='submit'>Điều chỉnh</button>
                    </>) : (null)}
                </form>

                {showButton ? (<>
                    <div className='row'>
                        <button className='m-3 btn btn-outline-success col-2' onClick={handleRepullAttendance}>Kéo lại điểm danh</button>
                        <button className='m-3 btn btn-outline-danger col-2' onClick={handleDeleteAttendance}>Xóa dữ liệu</button>
                        <button className='m-3 btn btn-outline-primary col-2' onClick={handleFinishUpdate}>Hoàn tất chỉnh sửa</button>
                    </div>
                </>) : (null)}
                <AttendanceAdjustmentTable attendanceData = {attendanceData}/>
            </div>
        </main>
    );
}
export default React.memo(AttendanceAdjustmentContent);