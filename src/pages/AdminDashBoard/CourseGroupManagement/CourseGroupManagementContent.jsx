import React, { useEffect, useState } from "react"
import * as XLSX from "xlsx"
import Swal from "sweetalert2"
import { courseService } from "../../../services/courseService";
import { adminService } from "../../../services/adminService";
import { sortArray } from "../../../utils/sortArray";
import Pagination from "../UserManagement/Pagination";
import NavBarToggle from "../../../components/NavBarToggle";
function CourseGroupManagementContent({ toggleNavBar }) {
    const [showCourseGroups, setShowCourseGroups] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentcourseGroups, setCurrentcourseGroups] = useState([]);
    const [lastSortedColumn, setLastSortedColumn] = useState({ key: '', ascending: true });
    const courseGroupsPerPage = 10;


    useEffect(() => { fetchCourseGroup() }, [])
    const fetchCourseGroup = async () => {
        const response = await courseService.getAllCourseGroup();
        if (response.status === 200) {
            setShowCourseGroups(response.metadata)
        }
    }
    useEffect(() => {
        const indexOfLastcourseGroup = currentPage * courseGroupsPerPage;
        const indexOfFirstcourseGroup = indexOfLastcourseGroup - courseGroupsPerPage;
        setCurrentcourseGroups(showCourseGroups.slice(indexOfFirstcourseGroup, indexOfLastcourseGroup));
    }, [showCourseGroups, currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    // Sort the current
    const handleSortCourseGroup = function (key) {
        const ascending = lastSortedColumn.key === key ? !lastSortedColumn.ascending : true;
        const sortedCourseGroups = sortArray([...showCourseGroups], key, ascending);
        setShowCourseGroups(sortedCourseGroups);
        setCurrentPage(1);
        setLastSortedColumn({ key, ascending });
    }

    const getSortIcon = (key) => {
        if (lastSortedColumn.key !== key) return null;
        return lastSortedColumn.ascending ? '▲' : '▼';
    };
    const handleFileUploadcourseGroup = async (e) => {
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
                const data = XLSX.utils.sheet_to_json(workSheet);

                Swal.fire({
                    title: `Bạn có chắc thêm ${data.length} nhóm học?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        Swal.fire('Đã xác nhận dữ liệu', 'Đang tiến hành thêm nhóm học...', 'info');
                        handleFectchCreateCourseGroupAPI(data);
                    }
                });
            };
            reader.readAsBinaryString(file);
        }
    };
    const handleFectchCreateCourseGroupAPI = async (data) => {
        try {
            const response = await courseService.createCourseGroups(data);
            if (response.status === 201) {
                Swal.fire('Thêm thành công', `Đã thêm ${data.length} nhóm học`, 'success');

                fetchCourseGroup();
                return
            } else {
                Swal.fire('Có lỗi xảy ra', 'Vui lòng thử lại', 'error');
            }
        } catch (error) {
            console.error('Error adding courseGroups:', error);
            Swal.fire('Lỗi', 'Không thể thêm nhóm học. Vui lòng thử lại sau.', 'error');
        }
    }
    const handleFileUploadStudentList = async (e) => {
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
                const data = XLSX.utils.sheet_to_json(workSheet);

                Swal.fire({
                    title: `Bạn có chắc thêm danh sách sinh viên vào nhóm học?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        Swal.fire('Đã xác nhận dữ liệu', 'Đang tiến hành thêm sinh viên vào nhóm học...', 'info');
                        handleFectchCreatestudentListAPI(data);
                    }
                });
            };
            reader.readAsBinaryString(file);
        }
    };
    const handleFectchCreatestudentListAPI = async (data) => {
        try {
            const response = await courseService.createstudentLists(data);
            if (response.status === 201) {
                Swal.fire('Thêm thành công', `Đã thêm ${data.length} sinh viên vào nhóm học`, 'success');

                return
            } else {
                Swal.fire('Có lỗi xảy ra', 'Vui lòng thử lại', 'error');
            }
        } catch (error) {
            console.error('Error adding studentLists:', error);
            Swal.fire('Lỗi', 'Không thể thêm nhóm học. Vui lòng thử lại sau.', 'error');
        }
    }
    return (

        <div className="h-screen flex-grow-1 overflow-y-lg-auto">

            <header className="bg-surface-primary border-bottom pt-1 pb-1">
                <div className="container">
                    <div className="mb-npx">
                        <div className="row align-items-center">
                            <div className="col-sm-6 col-12 mb-4 mb-sm-0">

                                <h1 className="h2 mb-0 ls-tight">
                                    <NavBarToggle toggleNavBar={toggleNavBar} />
                                    QUẢN LÝ NHÓM MÔN HỌC</h1>
                            </div>
                            <div className="col-sm-6 col-12 text-sm-end">
                                <button type="button" data-bs-toggle="modal"
                                    data-bs-target="#importCourseGroup" className="btn d-inline-flex btn-sm btn-warning mx-1">
                                    <span className="pe-2">
                                        <i className="bi bi-plus"></i>
                                    </span>
                                    <span>Tạo nhóm học</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="py-6 bg-surface-secondary">
                <div className="container">
                    <div className="card shadow border-1 mb-7">
                        <div className="card-header ">
                            <div className="row ">
                                <div className="table-responsive">
                                    <table className="table table-hover table-nowrap">
                                        <thead className="thead-light">
                                            <tr>

                                                <th scope="col" onClick={() => handleSortCourseGroup('semester_year_id')}>Mã học kỳ {getSortIcon('semester_year_id')}</th>
                                                <th scope="col">Nhóm</th>
                                                <th scope="col">Tên môn học</th>
                                                <th scope="col" onClick={() => handleSortCourseGroup('classroom_code')}>Phòng học {getSortIcon('classroom_code')}</th>
                                                <th scope="col">Giảng viên dạy</th>
                                                <th scope="col" onClick={() => handleSortCourseGroup('status')}>Trạng thái {getSortIcon('status ')}</th>
                                                <th scope="col">Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentcourseGroups.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item?.semester_year_id}</td>
                                                    <td>{item.group_code}</td>
                                                    <td>{item.course_name}</td>
                                                    <td>{item.classroom_code}</td>
                                                    <td>{item.nickname}</td>
                                                    <td className={item.status ? 'text-success' : 'text-danger'}>
                                                        {item.status ? 'Đang hoạt động' : 'Ngưng hoạt động'}
                                                    </td>
                                                    <td><button type="button" className="btn btn-warning" data-bs-toggle="modal"
                                                        data-bs-target="#viewCourseGroupModel">Xem</button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>


                            </div>

                        </div>
                        <div className="card-footer border-0 py-5">
                            <div className="row">
                                <div className="col-9">
                                    <span className="text-muted text-sm">
                                        Hiển thị {currentcourseGroups.length} nhóm học trong số <b className="text-danger">{showCourseGroups.length}</b> nhóm học
                                    </span>
                                    <Pagination
                                        totalItems={showCourseGroups.length}
                                        itemsPerPage={courseGroupsPerPage}
                                        currentPage={currentPage}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                                <div className="col-3 d-flex justify-content-end">
                                    {/* <button
                                        className="btn btn-outline-success"
                                        onClick={handleExportToExcel}
                                    >
                                        <i className="bi bi-box-arrow-up-right"></i> Xuất file (excel)
                                    </button> */}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
            <div className="modal" id="importCourseGroup" tabIndex="-1" aria-labelledby="importCourseGroup" aria-hidden="true">
                <div className="modal-dialog model-md">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Thêm nhóm học</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="courseGroupFile">Nhập file nhóm học(.xlsx hoặc .xls)</label>
                                <input className="btn d-inline-flex btn-sm btn-success mx-1" type="file" id="courseGroupFile" accept=".xlsx, .xls" onChange={handleFileUploadcourseGroup} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="studentList">Nhập file sinh viên học trong nhóm (.xlsx hoặc .xls)</label>
                                <input className="btn d-inline-flex btn-sm btn-warning mx-1" type="file" id="studentList" onChange={handleFileUploadStudentList} accept=".xlsx, .xls" />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    );
}
export default React.memo(CourseGroupManagementContent);
