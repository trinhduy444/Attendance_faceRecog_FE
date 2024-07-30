import React, { useEffect, useState } from "react"
import * as XLSX from "xlsx"
import Swal from "sweetalert2"
import { courseService } from "../../../services/courseService";
import { roomService } from "../../../services/roomService";
import { adminService } from "../../../services/adminService";
function CourseManagementContent() {
    const [courses, setCourses] = useState([])
    const [facultyId, setFacultyId] = useState("");
    const [inputFilter, setInputFilter] = useState("");
    const [credit, setCredit] = useState("");
    const [viewCourse, setViewCourse] = useState();

    // view Room
    const [building, setBuilding] = useState("");
    const [capacity, setCapacity] = useState("");
    const [rooms, setRooms] = useState([]);
    const [shiftEmpty, setShiftEmpty] = useState([]);
    const [listTeachers, setListTeachers] = useState([]);

    // create Course Grop
    const [classroom_code, setClassroom_code] = useState("");
    const [selectedShift, setSelectedShift] = useState('');
    const [dataSend, setDataSend] = useState([]);
    const [courseSelect, setCourseSelect] = useState("");


    const handleFetchCourseFilter = async () => {
        let type = isNaN(inputFilter.charAt(0)) ? 0 : 1;

        const requestBody = {
            faculty_id: facultyId,
            inputFilter: inputFilter,
            type: type,
            credit: parseInt(credit)
        };
        const response = await courseService.getCourseFilter(requestBody);
        if (response.status === 200) {
            setCourses(response.data.metadata);
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleFetchCourseFilter();
        }
    };
    const handleViewCourse = async (course) => {
        const res = await adminService.getAllTeachersByFaculty(course.faculty_id);
        setListTeachers(res.data.metadata)
        setCourseSelect(course.course_code)
        setViewCourse(course);
    }
    
    const handleShiftChange = (e) => {
        setSelectedShift(e.target.value);
    };
    // Tìm kiếm
    const handleSearchRoom = async () => {

        setShiftEmpty([])
        const requestBody = {
            building: building,
            capacity: parseInt(capacity)
        };
        const response = await roomService.getRoomsFilter(requestBody);
        if (response.status === 200) {
            setRooms(response.metadata);
        }
    }
    // Chọn phòng học
    const handleChooseRoom = async (classroom_code) => {
        setClassroom_code(classroom_code);
        const response = await roomService.getShiftEmpty(classroom_code);
        setShiftEmpty(response.metadata);
    }
    const closeModel = () => {
        setViewCourse(null)
        setRooms([])
        setShiftEmpty([])
        setListTeachers([])
        setCourseSelect(undefined);
    }

    // Upload các thành viên trong nhóm học
    const handleFileUploadUser = async (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        const validFileExtensions = ['.xls', '.xlsx'];
        const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
        if (!validFileExtensions.includes(fileExtension)) {
            Swal.fire({
                title: 'Lỗi',
                text: 'File không hợp lệ. Vui lòng chọn file Excel.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }
        if (file) {
            reader.onload = (evt) => {
                const bstr = evt.target.result;
                const workBook = XLSX.read(bstr, { type: 'binary' });
                const workSheetName = workBook.SheetNames[0];
                const workSheet = workBook.Sheets[workSheetName];
                const data = XLSX.utils.sheet_to_json(workSheet, { range: 1 });
                Swal.fire({
                    title: `Bạn có chắc thêm ${data.length} sinh viên vào nhóm`,
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonText: 'Chắc chắn',
                    cancelButtonText: 'Không',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        setDataSend(data)
                    }

                });
            };
            reader.readAsBinaryString(file);
        }
    }

    // Create Nhóm học
    const handleCreateCourseGroup = async (e) => {
        e.preventDefault();
        const selectTeacher = document.querySelector("#selectTeacher").value;
        const courseName = document.querySelector("#courseName").value;
        if (!selectTeacher) {
            Swal.fire('Hãy thử lại!', 'Vui lòng chọn giảng viên', 'error')
            return;
        }
        const requestBody = {
            course_code: courseSelect,
            group_code: courseName,
            teacher_id: parseInt(selectTeacher),
            total_student_qty: dataSend.length,
            shift_code: selectedShift,
            classroom_code, classroom_code,
            students: dataSend
        }
        const res = await courseService.createCourseGroup(requestBody)
        if(res.data.status === 201){
            Swal.fire('Thêm thành công', `Đã thêm nhóm ${courseName}`, 'success');
            closeModel()
        }
        else{
            Swal.fire('Lỗi', `Không thể thêm!`, 'error');
        }

    };
    return (

        <div className="h-screen flex-grow-1 overflow-y-lg-auto">

            <header className="bg-surface-primary border-bottom pt-3 pb-3">
                <div className="container">
                    <div className="mb-npx">
                        <div className="row align-items-center">
                            <div className="col-sm-6 col-12 mb-4 mb-sm-0">

                                <h1 className="h2 mb-0 ls-tight">
                                    QUẢN LÝ MÔN HỌC - ADMIN DASHBOARD</h1>
                            </div>
                            <div className="col-sm-6 col-12 text-sm-end">

                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="py-6 bg-surface-secondary">
                <div className="container">
                    <div className="row mb-2">
                        <div className="col-3 border border-dark rounded p-0">
                            <select
                                className="form-select"
                                aria-label="Select Faculty"
                                onChange={(e) => setFacultyId(e.target.value)}
                            >
                                <option value="">Chọn Khoa(nếu có)</option>
                                <option value="10010">Công Nghệ Thông Tin</option>
                                <option value="10011">Quản Trị Kinh Doanh</option>
                                <option value="10012">Điện - Điện tử</option>
                                <option value="10013">Kế Toán</option>
                                <option value="10014">Luật</option>
                                <option value="10015">Thiết kế đồ họa</option>
                            </select>
                        </div>
                        <div className="col-3 border border-dark rounded p-0">
                            <select
                                className="form-select"
                                aria-label="Select Credit"
                                onChange={(e) => setCredit(e.target.value)}
                            >
                                <option value="">Chọn số tin chỉ(nếu có)</option>
                                <option value="1">1 Tín</option>
                                <option value="2">2 Tín</option>
                                <option value="3">3 Tín</option>
                                <option value="4">4 Tín</option>
                                <option value="5">5 Tín</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <div className="input-group">
                                <input
                                    type="search"
                                    className="form-control rounded"
                                    placeholder="Nhập Tên môn học hoặc Mã môn"
                                    aria-label="Search"
                                    aria-describedby="search-addon"
                                    onChange={(e) => setInputFilter(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                    onClick={handleFetchCourseFilter}
                                >
                                    Tìm kiếm
                                </button>
                            </div>
                        </div>

                    </div>
                    <hr className="text-black" />
                    <div className="card shadow border-1 mb-7">
                        <div className="card-header ">
                            <div className="row ">

                                <h5 className="mb-0">DANH SÁCH MÔN HỌC | <b className="text-danger">{courses?.length}</b> Môn học</h5>

                            </div>

                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover table-nowrap table-striped">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Mã môn học</th>
                                        <th scope="col">Tên môn học</th>
                                        <th scope="col">Sô tín chỉ</th>
                                        <th scope="col">Trạng thái</th>
                                        <th scope="col">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {courses.map((item, index) => (
                                        <tr key={index}>
                                            <td><b>{item.course_code}</b></td>
                                            <td>{item.course_name}</td>
                                            <td>{item.credit} tín</td>
                                            <td>{item.status ? "Hoạt động" : "Không hoạt động"}</td>
                                            <td><button type="button" className="btn btn-link" onClick={() => handleViewCourse(item)} data-bs-toggle="modal"
                                                data-bs-target="#viewCourseModal">Thao tác</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer border-0 py-5">


                        </div>
                    </div>
                </div>
            </main>

            <div className="modal fade bd-example-modal-xl" id="viewCourseModal" tabIndex="-10" aria-labelledby="viewCourseModal" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <form onSubmit={handleCreateCourseGroup}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title">Thông tin môn học</h3>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-6">
                                        <ul className="list-unstyled mb-1-9 ms-3">
                                            <div className="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded p-3 text-center">
                                                <li className="mb-2 mb-xl-3 display-28"><span className="display-26 me-2 fw-bolder">Mã môn:</span><b className="text-danger"> {viewCourse?.course_code}</b></li>
                                                <li className="mb-2 mb-xl-3 display-28"><span className="display-26 me-2 fw-bolder">Tên môn học:</span><i className="text-success">{viewCourse?.course_name}</i></li>
                                            </div>



                                        </ul>
                                    </div>
                                    <div className="col-6">
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 me-2 fw-bolder">Số tín chỉ:</span>{viewCourse?.credit} tín chỉ</li>
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 me-2 fw-bolder">Trạng thái:</span>{viewCourse?.status ? "Hoạt động" : "Không hoạt động"}</li>
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 me-2 fw-bolder">Địa chỉ:</span> Phường Tân Phong, TP. Hồ Chí Minh, Việt Nam</li>
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 me-2 fw-bolder">Miêu tả môn học:</span> {viewCourse?.description}</li>
                                        <span> </span>
                                    </div>
                                </div>
                                <hr className="text-black" />
                                <div className="row">
                                    <div className="col-4 ">
                                        <label htmlFor="">Chọn giảng viên khoa <b>{viewCourse?.faculty_name}:</b> </label>
                                        <select id="selectTeacher"
                                            className="form-select border border-black"
                                            aria-label="Select Credit"
                                        >
                                            <option value="">Chọn giảng viên</option>
                                            {listTeachers.length > 0 && listTeachers.map((teacher) => (
                                                <option key={teacher.user_id} value={teacher.user_id}>{teacher.nickname}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <label htmlFor="courseName">Tên nhóm: </label>
                                        <select id="courseName"
                                            className="form-select border border-black"
                                            aria-label="Select Credit"
                                        >
                                            <option value="N01">Nhóm 01</option>
                                            <option value="N02">Nhóm 02</option>
                                            <option value="N03">Nhóm 03</option>
                                            <option value="N04">Nhóm 04</option>

                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <label htmlFor="userFile">Chọn file sinh viên học nhóm(.xlsx hoặc .xls)</label>
                                        <input className="btn d-inline-flex btn-sm btn-success mx-1" type="file" id="userFile" onChange={handleFileUploadUser} accept=".xlsx, .xls" required />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="selectClassRoom" className="form-control">Chọn phòng theo tiêu chí: </label>
                                    <div className="col-5">
                                        <select
                                            className="form-select border border-black"
                                            aria-label="Select building"
                                            onChange={(e) => setBuilding(e.target.value)}
                                        >
                                            <option value="">Chọn tòa</option>
                                            <option value="A">Tòa A</option>
                                            <option value="B">Tòa B</option>
                                            <option value="C">Tòa C</option>
                                            <option value="D">Tòa D</option>
                                            <option value="E">Tòa E</option>
                                        </select>
                                    </div>
                                    <div className="col-5">
                                        <select
                                            className="form-select border border-black"
                                            aria-label="Select capacity" onChange={(e) => setCapacity(e.target.value)}
                                        >
                                            <option value="25">Chọn số lượng người tối đa</option>
                                            <option value="25">25 người</option>
                                            <option value="50">50 người</option>
                                            <option value="75">75 người</option>
                                            <option value="100">100 người</option>
                                            <option value="150">150 người</option>
                                        </select>
                                    </div>
                                    <button type='button' className="col-2 btn btn-info" onClick={handleSearchRoom}>Tìm phòng</button>
                                </div>
                                {rooms.length > 0 ? (
                                    <div className="overflow-auto border border-dark mt-1" id="viewRoominCourse">
                                        <table className="table table-hover table-nowrap">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th scope="col">Mã phòng</th>
                                                    <th scope="col">Tầng</th>
                                                    <th scope="col">Số Lượng</th>
                                                    <th scope="col">Mô tả</th>
                                                    <th scope="col">Chọn phòng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rooms.map((room, index) => (
                                                    <tr key={index}>
                                                        <td><b>{room.classroom_code}</b></td>
                                                        <td>{room.floor}</td>
                                                        <td>{room.capacity}</td>
                                                        <td>{room.description}</td>
                                                        <td><a href="#choseShift" type="button" className="bg-info text-black" onClick={() => handleChooseRoom(room.classroom_code)}
                                                        >Chọn</a></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (null)}
                                {shiftEmpty.length > 0 ? (

                                    <section id="choseShift" className="text-center">
                                        <p style={{ display: 'inline-block', margin: '5px' }}>Chọn ca đang trống</p>
                                        {shiftEmpty.map((shift) => (
                                            <div key={shift} style={{ display: 'inline-block', margin: '10px' }}>
                                                <label htmlFor="shiftEmpt"><b>{shift} -&nbsp;</b></label>
                                                <input type="radio" id={shift} name="shiftEmpt" value={shift} required onChange={handleShiftChange}/>
                                            </div>
                                        ))}
                                    </section>

                                ) : null}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => closeModel()} data-bs-dismiss="modal">Đóng</button>
                                <button type="submit" id="submitCreateCourseGroup" className="btn btn-success">Tạo nhóm</button>
                            </div>

                        </div>
                    </form>

                </div>
            </div >


        </div >
    );
}
export default React.memo(CourseManagementContent);
