import React, { useEffect, useState } from "react"
import * as XLSX from "xlsx"
import Swal from "sweetalert2"
import { adminService } from "../../../services/adminService";
function TeacherManagementContent() {
    const [showTeacher, setShowTeacher] = useState([]);
    useEffect(() => {
        fetchTeachers();
    }, [])
    const fetchTeachers = async () => {
        const response = await adminService.getAllTeachers();
        if (response.status === 200) {
            setShowTeacher(response.data.metadata);
        }

    }
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
                                    QUẢN LÝ GIẢNG VIÊN - ADMIN DASHBOARD</h1>
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
                                        <span>Create teacher</span>
                                    </a>
                                    <button type="button" data-bs-toggle="modal"
                                        data-bs-target="#importTeacherFile" className="btn d-inline-flex btn-sm btn-warning mx-1">
                                        <span className="pe-2">
                                            <i className="bi bi-plus"></i>
                                        </span>
                                        <span>Create multiple teachers</span>
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
                                        <th scope="col">MSGV</th>
                                        <th scope="col">Họ Và Tên</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Số điện thoại</th>
                                        <th scope="col">Khoa</th>
                                        <th scope="col">Khóa</th>
                                        <th scope="col">Giới tính</th>
                                        <th scope="col">Thao tác</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {showTeacher.map((item, index) => (
                                        <tr key={index}>
                                            <td><b>{item.username}</b></td>
                                            <td>{item.nickname}</td>
                                            <td>{item.email}</td>
                                            <td>+{item.phone}</td>
                                            <td>{item.faculty_name}</td>
                                            <td>{item.course_year}</td>
                                            {item.gender ? <td>Nam</td> : <td>Nữ</td>}
                                            <td><button>View</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer border-0 py-5">
                            <span className="text-muted text-sm">Showing 10 items out of 250 results found</span>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item"><a className="page-link disabled" href="#">Previous</a></li>
                                    <li className="page-item"><a className="page-link bg-info text-white" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>

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
        </div>
    );
}
export default React.memo(TeacherManagementContent);
