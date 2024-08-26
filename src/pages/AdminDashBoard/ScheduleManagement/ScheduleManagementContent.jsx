import React, { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { adminService } from "../../../services/adminService";
import NavBarToggle from "../../../components/NavBarToggle"

function ScheduleManagementContent({ toggleNavBar }) {
    return (
        <div className="h-screen flex-grow-1 overflow-y-lg-auto">
            <header className="bg-surface-primary border-bottom pt-3 pb-3">
                <div className="container">
                    <div className="mb-npx">
                        <div className="row align-items-center">
                            <div className="col-sm-6 col-12 mb-4 mb-sm-0">

                                <h1 className="h2 mb-0 ls-tight">
                                    <NavBarToggle toggleNavBar={toggleNavBar} />QUẢN LÝ LỊCH HỌC</h1>
                            </div>
                            <div className="col-sm-6 col-12 text-sm-end">
                                <div className="mx-n1">
                                    <a href="#" className="btn d-inline-flex btn-sm btn-neutral border-base mx-1">
                                        <span className=" pe-2">
                                            <i className="bi bi-pencil"></i>
                                        </span>
                                        <span>Edit</span>
                                    </a>
                                    <button type="button" data-bs-toggle="modal"
                                        data-bs-target="#createClassRoomModel" className="btn d-inline-flex btn-sm btn-primary mx-1">
                                        <span className="pe-2">
                                            <i className="bi bi-plus"></i>
                                        </span>
                                        <span>Create Class Room</span>
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
                                        <th scope="col">Ảnh</th>
                                        <th scope="col">MSSV</th>
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
                                    {/* {showUser.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <img src={item.avatar_path} alt="Ảnh SV" className="rounded-circle" width="50" />
                                            </td>
                                            <td><b>{item.username}</b></td>
                                            <td>{item.nickname}</td>
                                            <td>{item.email}</td>
                                            <td>+{item.phone}</td>
                                            <td>{item.faculty_name}</td>
                                            <td>{item.course_year}</td>
                                            {item.gender ? <td>Nam</td> : <td>Nữ</td>}
                                            <td><button>View</button></td>
                                        </tr>
                                    ))} */}
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
            <div className="modal" id="createClassRoomModel" tabIndex="-1" aria-labelledby="createClassRoomModel" aria-hidden="true">
                <div className="modal-dialog model-md">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Thêm phòng học</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="userFile">Nhập file người dùng(.xlsx hoặc .xls)</label>
                                <input className="btn d-inline-flex btn-sm btn-success mx-1" type="file" id="userFile" accept=".xlsx, .xls" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="userImages">Nhập ảnh người dùng(.png hoặc .jpg)</label>
                                <input className="btn d-inline-flex btn-sm btn-warning mx-1" type="file" id="userImages" accept=".png, .jpg" />
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
export default React.memo(ScheduleManagementContent);
