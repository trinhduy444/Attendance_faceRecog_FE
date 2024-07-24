import React, { useEffect, useState, useMemo } from "react"
import * as XLSX from "xlsx"
import Swal from "sweetalert2"
import { adminService } from "../../../services/adminService";
function UserManagementContent() {
    const [data, setData] = useState([]);
    const [showUser, setShowUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const fetchUsers = async () => {
        const response = await adminService.getAllUsers();
        if (response.status === 200) {
            setShowUser(response.data.metadata);
        }

    }
    useEffect(() => {
        fetchUsers();
    }, [])
    // Sort


    // Tính toán dữ liệu người dùng cho trang hiện tại
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = showUser.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(showUser.length / usersPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        if(currentUsers.length){
            console.log(currentUsers);
        }
    };


    // Fetch create users
    const handleFectchCreateUserAPI = async (data) => {
        try {
            const response = await adminService.createUsers(data);
            if (response.status === 201) {
                Swal.fire('Thêm thành công', `Đã thêm ${data.length} users`, 'success');

                window.location.reload();
            } else {
                Swal.fire('Có lỗi xảy ra', 'Vui lòng thử lại', 'error');
            }
        } catch (error) {
            console.error('Error adding users:', error);
            Swal.fire('Lỗi', 'Không thể thêm users. Vui lòng thử lại sau.', 'error');
        }
    }

    // Thao tác upload

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
                const data = XLSX.utils.sheet_to_json(workSheet);

                Swal.fire({
                    title: `Bạn có chắc thêm ${data.length} người dùng?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        setData(data);
                        Swal.fire('Đã xác nhận dữ liệu', 'Đang tiến hành thêm users...', 'info');
                        handleFectchCreateUserAPI(data);
                    }
                });
            };
            reader.readAsBinaryString(file);
        }
    };

    const handleUploadImageUsers = async (event) => {
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

    return (

        <div className="h-screen flex-grow-1 overflow-y-lg-auto">
            <header className="bg-surface-primary border-bottom pt-3 pb-3">
                <div className="container">
                    <div className="mb-npx">
                        <div className="row align-items-center">
                            <div className="col-sm-6 col-12 mb-4 mb-sm-0">

                                <h1 className="h2 mb-0 ls-tight">
                                    QUẢN LÝ SINH VIÊN - ADMIN DASHBOARD</h1>
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
                                        <span>Create user</span>
                                    </a>
                                    <button type="button" data-bs-toggle="modal"
                                        data-bs-target="#importUserFile" className="btn d-inline-flex btn-sm btn-warning mx-1">
                                        <span className="pe-2">
                                            <i className="bi bi-plus"></i>
                                        </span>
                                        <span>Create multiple users</span>
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
                            <h5 className="mb-0">DANH SÁCH SINH VIÊN</h5>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover table-nowrap">
                                <thead className="thead-light">
                                    <tr>
                                        {/* <th scope="col">Ảnh</th> */}
                                        <th scope="col">MSSV</th>
                                        <th scope="col">Họ Và Tên</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Số điện thoại</th>
                                        <th scope="col">Khoa</th>
                                        <th scope="col">Khóa</th>
                                        <th scope="col">Giới tính</th>
                                        <th scope="col">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUsers.map((item, index) => (
                                        <tr key={index}>
                                            {/* <td>
                                                <img src={item.avatar_path} alt="Ảnh SV" className="rounded-circle" width="50" />
                                            </td> */}
                                            <td><b>{item.username}</b></td>
                                            <td>{item.nickname}</td>
                                            <td>{item.email}</td>
                                            <td>+{item.phone}</td>
                                            <td>{item.faculty_name}</td>
                                            <td>{item.course_year}</td>
                                            <td>{item.gender ? "Nam" : "Nữ"}</td>
                                            <td><button>View</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer border-0 py-5">
                            <span className="text-muted text-sm">
                                Showing {usersPerPage} items out of {showUser.length} results found
                            </span>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <li key={i} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
                                            <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                                                {i + 1}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                        </div>
                    </div>
                </div>
            </main>
            <div className="modal" id="importUserFile" tabIndex="-1" aria-labelledby="importUserFile" aria-hidden="true">
                <div className="modal-dialog model-md">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Thêm người dùng</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="userFile">Nhập file người dùng(.xlsx hoặc .xls)</label>
                                <input className="btn d-inline-flex btn-sm btn-success mx-1" type="file" id="userFile" accept=".xlsx, .xls" onChange={handleFileUploadUser} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="userImages">Nhập ảnh người dùng(.png hoặc .jpg)</label>
                                <input className="btn d-inline-flex btn-sm btn-warning mx-1" type="file" id="userImages" accept=".png, .jpg" onChange={handleUploadImageUsers} multiple />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            <button type="button" id="submitFileBtn" className="btn btn-warning">Nhập</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default React.memo(UserManagementContent);
