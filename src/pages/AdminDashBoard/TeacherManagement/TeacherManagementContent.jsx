import React, { useEffect, useState } from "react"
import * as XLSX from "xlsx"
import Swal from "sweetalert2"
import { adminService } from "../../../services/adminService";
import { sortArray } from "../../../utils/sortArray"
import NavBarToggle from "../../../components/NavBarToggle";
import Pagination from "../UserManagement/Pagination";
function TeacherManagementContent({ toggleNavBar }) {
    const [showTeacher, setShowTeacher] = useState([]);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [currentUsers, setCurrentUsers] = useState([]);
    const [lastSortedColumn, setLastSortedColumn] = useState({ key: '', ascending: true });
    const usersPerPage = 10;

    // View Teacher
    const [viewTeacher, setViewTeacher] = useState(null);
    useEffect(() => {
        fetchTeachers();
    }, [])
    const fetchTeachers = async () => {
        const response = await adminService.getAllTeachers();
        if (response.status === 200) {
            setShowTeacher(response.data.metadata);
        }

    }
    useEffect(() => {
        const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;
        setCurrentUsers(showTeacher.slice(indexOfFirstUser, indexOfLastUser));
    }, [showTeacher, currentPage]);

    
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    // Sort
    const handleSortUser = function (key) {
        const ascending = lastSortedColumn.key === key ? !lastSortedColumn.ascending : true;
        const sortedUsers = sortArray([...showTeacher], key, ascending);
        setShowTeacher(sortedUsers);
        setCurrentPage(1);
        setLastSortedColumn({ key, ascending });
    }

    const getSortIcon = (key) => {
        if (lastSortedColumn.key !== key) return null;
        return lastSortedColumn.ascending ? '▲' : '▼';
    };
    const handleFileUploadTeacher = async (e) => {
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
                    title: `Bạn có chắc thêm ${data.length} giảng viên?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        Swal.fire('Đã xác nhận dữ liệu', 'Đang tiến hành thêm giảng viên...', 'info');
                        // if (data) {
                        //     console.log("data", data)
                        // }
                        handleFectchCreateTeacherAPI(data);
                    }

                });
            };
            reader.readAsBinaryString(file);
        }
    };

    const handleFectchCreateTeacherAPI = async (data) => {
        try {
            const response = await adminService.createTeachers(data);
            if (response.status === 201) {
                Swal.fire('Thêm thành công', `Đã thêm ${data.length} giảng viên`, 'success');
                fetchTeachers()

            } else {
                Swal.fire('Có lỗi xảy ra', 'Vui lòng thử lại', 'error');
            }
        } catch (error) {
            console.error('Error adding Teachers:', error);
            Swal.fire('Lỗi', 'Không thể thêm Teachers. Vui lòng thử lại sau.', 'error');
        }
    }
    const handleUploadImageTeachers = async (event) => {
        const files = event.target.files;
        if (files.length === 0) return;

        const formData = new FormData();
        if (files) {
            Array.from(files).forEach(file => formData.append('images', file));
            try {
                const result = await Swal.fire({
                    title: 'Bạn có chắc chắn?',
                    text: `Bạn muốn tải lên ${files.length} ảnh?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Có, tải lên!',
                    cancelButtonText: 'Không, hủy!',
                    showLoaderOnConfirm: true,
                    preConfirm: async () => {
                        try {
                            const response = await adminService.uploadImages(formData);
                            if (response.status === 201) {
                                Swal.fire('Thành công', `Đã tải lên ${files.length} ảnh`, 'success');
                                fetchTeachers()
                            } else {
                                Swal.fire('Có lỗi xảy ra', 'Vui lòng thử lại', 'error');
                            }
                        } catch (error) {
                            console.error('Error uploading images:', error);
                            Swal.fire('Lỗi', 'Không thể tải ảnh lên. Vui lòng thử lại sau.', 'error');
                        }
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                });

            } catch (error) {
                console.error('Error uploading images:', error);
                Swal.fire('Lỗi', 'Không thể tải ảnh lên. Vui lòng thử lại sau.', 'error');
            }
        }


    };


    const handleExportToExcel = () => {
        // Dữ liệu
        const data = showTeacher.map(user => ({
            'Email Giảng Viên': user.email,
            'MSGV': user.username,
            'Họ Và Tên': user.nickname,
            'Đường dẫn khuôn mặt': user.avatar_path,
            'Khóa nhập học': user.course_year,
            'Giới tính': user.gender ? 'Nam' : 'Nữ',
            'Khoa': user.faculty_name
        }));

        // Define headers
        const headers = [
            'Email Giảng Viên',
            'MSSV',
            'Họ Và Tên',
            'Đường dẫn khuôn mặt',
            'Khóa nhập học',
            'Giới tính',
            'Khoa'
        ];

        const ws = XLSX.utils.aoa_to_sheet([]);
        XLSX.utils.sheet_add_aoa(ws, [[`Danh Sách Giảng Viên xuất file ngày ${new Date().toLocaleDateString()}`]], { origin: 'A1' });
        XLSX.utils.sheet_add_aoa(ws, [headers], { origin: 'A2' });
        XLSX.utils.sheet_add_json(ws, data, { origin: 'A3', skipHeader: true });

        const columnWidths = [
            { wch: 30 }, // Email
            { wch: 15 }, // MSSV
            { wch: 30 }, // Họ Và Tên
            { wch: 50 }, // Đường dẫn khuôn mặt
            { wch: 15 }, // Khóa nhập học
            { wch: 10 }, // Giới tính
            { wch: 30 }  // Khoa
        ];
        ws['!cols'] = columnWidths;

        // Merge cells for title
        ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }];

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Danh Sách Giảng viên');

        const fileName = `DanhSachGiangVien_${new Date().toISOString().slice(0, 10)}.xlsx`;

        XLSX.writeFile(wb, fileName);
    };
    //view teacher
    const handleViewTeacher = (teaher) => {
        setViewTeacher(teaher);
    }

    const handleLockAccount = async (userId) => {
        const response = await adminService.lockUserAccount(userId,2)
        // console.log("lock",response);
        console.log(response);
        if (response.status === 200) {
            Swal.fire("Thành công!", "Khóa tài khoản thành công.", "success")
            fetchTeachers()
            return;
        } else {
            Swal.fire("Thất bại!", "Khóa tài khoản thất bại", "error")
            return;
        }
    };
    const handleUnLockAccount = async (userId) => {
        const response = await adminService.unLockUserAccount(userId,2)

        if (response.status === 200) {
            Swal.fire("Thành công!", "Mở khóa tài khoản thành công.", "success")
            fetchTeachers()
            return;
        } else {
            Swal.fire("Thất bại!", "Mở khóa tài khoản thất bại", "error")
            return;
        }
    }
    return (

        <div className="h-screen flex-grow-1 overflow-y-lg-auto">
            <header className="bg-surface-primary border-bottom pt-3 pb-3">
                <div className="container">
                    <div className="mb-npx">
                        <div className="row align-items-center">
                            <div className="col-sm-6 col-12 mb-4 mb-sm-0">

                                <h1 className="h2 mb-0 ls-tight">
                                    <NavBarToggle toggleNavBar={toggleNavBar} />
                                    QUẢN LÝ GIẢNG VIÊN</h1>
                            </div>
                            <div className="col-sm-6 col-12 text-sm-end">
                                <div className="mx-n1">
                                    <a href="#" className="btn d-inline-flex btn-sm btn-neutral border-base mx-1">
                                        <span className=" pe-2">
                                            <i className="bi bi-pencil"></i>
                                        </span>
                                        <span>Edit</span>
                                    </a>
                                    <a href="#" className="btn d-inline-flex btn-sm btn-primary mx-1">
                                        <span className=" pe-2">
                                            <i className="bi bi-plus"></i>
                                        </span>
                                        <span>Tạo giảng viên</span>
                                    </a>
                                    <button type="button" data-bs-toggle="modal"
                                        data-bs-target="#importTeacherFile" className="btn d-inline-flex btn-sm btn-warning mx-1">
                                        <span className="pe-2">
                                            <i className="bi bi-plus"></i>
                                        </span>
                                        <span>Tạo nhiều giảng viên</span>
                                    </button>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <main className="py-6 bg-surface-secondary">
                <div className="container">
                    <div className="card shadow border-1 mb-7">
                        <div className="card-header">
                            <h5 className="mb-0">DANH SÁCH Giảng Viên</h5>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover table-nowrap">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">MSGV</th>
                                        <th scope="col">Họ Và Tên</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Số điện thoại</th>
                                        <th scope="col" onClick={() => handleSortUser('faculty_name')}>Khoa {getSortIcon('faculty_name')}</th>
                                        <th scope="col" onClick={() => handleSortUser('course_year')}>
                                            Khóa {getSortIcon('course_year')}
                                        </th>
                                        <th scope="col" onClick={() => handleSortUser('gender')}>
                                            Giới tính {getSortIcon('gender')}</th>
                                        <th scope="col">Thao tác</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUsers.map((item, index) => (
                                        <tr key={index}>
                                            <td><b>{item.username}</b></td>
                                            <td>{item.nickname}</td>
                                            <td>{item.email}</td>
                                            <td>+{item.phone}</td>
                                            <td>{item.faculty_name}</td>
                                            <td>{item.course_year}</td>
                                            {item.gender ? <td>Nam</td> : <td>Nữ</td>}
                                            <td><button type="button" className="btn btn-warning" onClick={() => handleViewTeacher(item)} data-bs-toggle="modal"
                                                data-bs-target="#viewTeacherModel">Xem</button></td>                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer border-0 py-5">
                            <div className="row">
                                <div className="col-9">
                                    <span className="text-muted text-sm">
                                        Hiển thị {currentUsers.length} Giảng Viên trong số <b className="text-danger">{showTeacher.length}</b> Giảng Viên
                                    </span>
                                    <Pagination
                                        totalItems={showTeacher.length}
                                        itemsPerPage={usersPerPage}
                                        currentPage={currentPage}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                                <div className="col-3 d-flex justify-content-end">
                                    <button
                                        className="btn btn-outline-success"
                                        onClick={handleExportToExcel}
                                    >
                                        <i className="bi bi-box-arrow-up-right"></i> Xuất file (excel)
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
            <div className="modal" id="importTeacherFile" tabIndex="-1" aria-labelledby="importTeacherFile" aria-hidden="true">
                <div className="modal-dialog model-md">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Thêm người dùng</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="TeacherFile">Nhập file người dùng(.xlsx hoặc .xls)</label>
                                <input className="btn d-inline-flex btn-sm btn-success mx-1" type="file" id="TeacherFile" accept=".xlsx, .xls" onChange={handleFileUploadTeacher} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="TeacherImages">Nhập ảnh người dùng(.png hoặc .jpg)</label>
                                <input className="btn d-inline-flex btn-sm btn-warning mx-1" type="file" id="TeacherImages" accept=".png, .jpg" onChange={handleUploadImageTeachers} multiple />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            <button type="button" id="submitFileBtn" className="btn btn-warning">Nhập</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade bd-example-modal-lg" id="viewTeacherModel" tabIndex="-1" aria-labelledby="viewTeacherModel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Thông tin Giảng viên: {viewTeacher?.nickname}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row p-2 border border-bottom-3 ">
                                <div className="col-4">
                                    <img src={viewTeacher?.avatar_path} className="rounded" alt="Ảnh Giảng viên.." />
                                </div>
                                <div className="col-8">
                                    <div className="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded p-3">
                                        <h3 className="h2 text-black mb-0">{viewTeacher?.nickname}</h3>
                                        <span >Giảng viên khoa: <b className="text-danger">{viewTeacher?.faculty_name} | {viewTeacher?.course_year}</b></span>
                                    </div>
                                    <hr />
                                    <h5 className="mb-2">Thông tin chi tiết:</h5>
                                    <ul className="list-unstyled mb-1-9 ms-3">
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 me-2 fw-bolder">MSGV:</span> {viewTeacher?.username}</li>
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 me-2 fw-bolder">Giới tính:</span>{viewTeacher?.gender ? 'Nam' : 'Nữ'}</li>
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 me-2 fw-bolder">Email:</span><a href={`mailto:${viewTeacher?.email}`}>{viewTeacher?.email}</a> </li>
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 me-2 fw-bolder">Số điện thoại:</span>+{viewTeacher?.phone}</li>
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 me-2 fw-bolder">Địa chỉ:</span> Phường Tân Phong, TP. Hồ Chí Minh, Việt Nam</li>

                                    </ul>
                                </div>
                            </div>

                            <div className="row p-2 border border-bottom-3 ">

                                <label htmlFor="message" className="fw-bold">Gửi tin nhắn cho Giảng viên:</label>

                                <textarea name="message" className="border border-black rounded p-2" id="messageText" rows="5" placeholder="Nhập tin nhắn..."></textarea>

                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            {viewTeacher?.status === true ? (<button type="button" id="submitFileBtn" className="btn btn-danger" onClick={() => handleLockAccount(viewTeacher.user_id)}>Khóa tài khoản</button>
                            ) : (<button type="button" id="submitFileBtn" className="btn btn-success" onClick={() => handleUnLockAccount(viewTeacher.user_id)}>Mở tài khoản</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default React.memo(TeacherManagementContent);
