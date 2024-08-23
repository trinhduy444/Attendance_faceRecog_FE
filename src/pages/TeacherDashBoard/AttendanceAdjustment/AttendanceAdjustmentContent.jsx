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
    const [filteredData, setFilteredData] = useState([]);
    // Input State
    const [showButton, setShowButton] = useState(false);
    const [disableFilter, setDisableFilter] = useState(false);
    const [disabledTable, setDisabledTable] = useState(false);

    // Input name 
    const [inputFilter, setInputFilter] = useState("");

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
    console.log(attendanceData)
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

        await handleUpdateAttendanceFromRawData(false);
        const response = await attendanceService.getAttendance(selectedGroup, selectedDate);
        setAttendanceData(response.data.data);
        setFilteredData(response.data.data);
        setShowButton(true);
        setDisableFilter(true);
        setDisabledTable(false);
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
    const handleFinishUpdate = () => {
        // setAttendanceData([]);
        // setShowButton(false);
        // setDisableFilter(false);
        Swal.fire({
            title: "Bạn có muốn gửi mail cảnh tới sinh viên?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Gửi mail",
            denyButtonText: `Không gửi!`
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const response = await attendanceService.updateTotalAbsentAllCourseGroup(selectedGroup, true)
                if (response.status === 200) {

                    Swal.fire('Thành công!', 'Điều chỉnh dữ liệu và gửi mail điểm danh thành công', 'success', 1500)
                } else {
                    Swal.fire('Thất bại!', 'Điều chỉnh dữ liệu và gửi mail thất bại, vui lòng thử lại', 'error', 1500)

                }
            } else if (result.isDenied) {
                const response = await attendanceService.updateTotalAbsentAllCourseGroup(selectedGroup, false)
                if (response.status === 200) {
                    Swal.fire('Thành công!', 'Điều chỉnh dữ liệu điểm danh thành công', 'success', 1500)
                } else {
                    Swal.fire('Thất bại!', 'Điều chỉnh dữ liệu thất bại, vui lòng thử lại', 'error', 1500)

                }
            }
        });
        setShowButton(false);
        setDisableFilter(false);
        setDisabledTable(true);
        // Swal.fire('Thành công!', 'Chỉnh sửa dữ liệu điểm danh thành công', 'success', 1500)
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
                await handleUpdateAttendanceFromRawData(true);
                const response = await attendanceService.getAttendance(selectedGroup, selectedDate);
                setAttendanceData(response.data.data);
                setFilteredData(response.data.data);
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
                setFilteredData([]);
                setShowButton(false);
                setDisableFilter(false);
            }
        });
    }
    // Filter Name and MSSV 
    const handleFilterChange = (e) => {
        const filterValue = e.target.value.toLowerCase();
        setInputFilter(filterValue);

        const filtered = attendanceData.filter((item) =>
            item.nickname.toLowerCase().includes(filterValue) ||
            item.username.includes(filterValue)
        );

        setFilteredData(filtered);
    };

    return (
        <main className="py-2 bg-surface-secondary" id='topAdjustment'>
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
                            <input type="date" className='form-control' disabled={disableFilter} value={selectedDate} onChange={handleDateChange} />
                        </div>
                        <button className='btn btn-outline-primary col-2' disabled={disableFilter} type='submit'>Điều chỉnh</button>
                    </>) : (null)}
                </form>

                {showButton ? (<>
                    <div className='row m-2'>
                        <div className="col-8 d-flex justify-content-evenly">
                            <button className='btn btn-outline-success' onClick={handleRepullAttendance}>Kéo lại điểm danh</button>
                            <button className='btn btn-outline-danger' onClick={handleDeleteAttendance}>Xóa dữ liệu</button>
                            <button className='btn btn-outline-primary' onClick={handleFinishUpdate}>Hoàn tất chỉnh sửa</button>
                        </div>
                        <div className="col-4">
                            <div className="input-group">
                                <input
                                    type="search"
                                    className="form-control rounded border border-black"
                                    placeholder="Nhập tên hoặc MSSV"
                                    aria-label="Search"
                                    aria-describedby="search-addon"
                                    value={inputFilter}
                                    onChange={handleFilterChange}
                                />
                            </div>
                        </div>

                    </div>
                </>) : (null)}
                <AttendanceAdjustmentTable attendanceData={filteredData} disabledTable={disabledTable} />
                {filteredData.length > 15 ? (<a href="#topAdjustment" className='mt-2 bi bi-align-top btn btn-outline-primary text-right'>Lên đầu trang</a>
                ) : (null)}
            </div>
        </main>
    );
}
export default React.memo(AttendanceAdjustmentContent);
