import React, { useEffect, useState } from "react"
import * as XLSX from "xlsx"
import NavBar from "../../../components/NavBar"
import Swal from "sweetalert2"
export const UserManagement = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        document.title = "Quản lý người dùng"
    }, [])
    console.log("render UserManagement");
    const handleFileUploadUser = (e) => {
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
                }).then((result) => {
                    if (result.isConfirmed) {
                        setData(data);
                        Swal.fire('Thêm thành công', '', 'success');
                    }
                });
            };
            reader.readAsBinaryString(file);
        }
    };
    // console.log("render notifi");
    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
            {/* <!-- Vertical Navbar --> */}
            <NavBar />

            {/* <!-- Main content --> */}
            <div className="h-screen flex-grow-1 overflow-y-lg-auto">
                <header className="bg-surface-primary border-bottom pt-3 pb-3">
                    <div className="container">
                        <div className="mb-npx">
                            <div className="row align-items-center">
                                <div className="col-sm-6 col-12 mb-4 mb-sm-0">
                                    <h1 className="h2 mb-0 ls-tight">
                                        QUẢN LÝ NGƯỜI DÙNG - ADMIN DASHBOARD</h1>
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
                                        {/* <a type="button" className="btn d-inline-flex btn-sm btn-warning mx-1" data-bs-toggle="modal"
                                            data-bs-target="#importUserFile">
                                            <span className=" pe-2">
                                                <i className="bi bi-plus"></i>
                                            </span>
                                            <input className="form-control form-control-sm" type="file" id="userFile" accept=".xlsx, .xls" onChange={handleFileUploadUser} />

                                            <span>Nhập file</span>
                                        </a>
                                        */}

                                        <input className="btn d-inline-flex btn-sm btn-warning mx-1" type="file" id="userFile" accept=".xlsx, .xls" onChange={handleFileUploadUser} />


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                {/* <!-- Main --> */}
                <main className="py-6 bg-surface-secondary">
                    <div className="container">
                        <div className="card shadow border-1 mb-7">
                            <div className="card-header">
                                <h5 className="mb-0">DANH SÁCH NGƯỜI DÙNG</h5>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover table-nowrap">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Ảnh</th>
                                            <th scope="col">MSSV</th>
                                            <th scope="col">Họ Lót</th>
                                            <th scope="col">Tên</th>
                                            <th scope="col">Khoa</th>
                                            <th scope="col">Khóa</th>
                                            <th scope="col">Username</th>
                                            <th scope="col">Password</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">Gender</th>
                                            <th scope="col">Birthday</th>

                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <img src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="rounded-circle" width="40" />
                                                </td>
                                                <td>{item["MSSV"]}</td>
                                                <td>{item["Họ Lót"]}</td>
                                                <td>{item["Tên"]}</td>
                                                <td>{item["Khoa"]}</td>
                                                <td>{item["Khóa"]}</td>
                                                <td>{item["Username"]}</td>
                                                <td>{item["Password"]}</td>
                                                <td>{item["Email"]}</td>
                                                <td>{item["Phone"]}</td>
                                                <td>{item["Gender"]}</td>
                                                <td>{item["Birthday"]}</td>
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
                {/* <div className="modal" id="importUserFile" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Nhập file người dùng</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="userFile">Nhập file người dùng(.xlsx hoặc .xls)</label>
                                    <input className="form-control form-control-sm" type="file" id="userFile" accept=".xlsx, .xls" onChange={handleFileUploadUser} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                <button type="button" id="submitFileBtn" className="btn btn-warning">Nhập</button>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}