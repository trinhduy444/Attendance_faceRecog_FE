import React, { useEffect } from "react"
export const AttendanceDetail = () => {
    useEffect(() => {
        document.title = "Dữ liệu điểm danh"
    }, [])
    // console.log("render notifi");
    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
            <div className="h-screen flex-grow-1 overflow-y-lg-auto">
                <header className="bg-surface-primary border-bottom pt-6">
                    <div className="container">
                        <div className="mb-npx">
                            <div className="row align-items-center">
                                <div className="col-sm-6 col-12 mb-4 mb-sm-0">
                                    <h1 className="h2 mb-0 ls-tight">
                                        CHI TIẾT DỮ LIỆU ĐIỂM DANH
                                    </h1>
                                </div>
                            </div>
                            <ul className="nav nav-tabs overflow-x border-0">
                                <li className="nav-item ">
                                    <a href="/" className="nav-link font-regular"><i className="bi bi-house"></i> Trang chủ</a>
                                </li>
                                <li className="nav-item ">
                                    <a href="/attendance" className="nav-link font-regular"><i className="bi bi-clipboard-data"></i> Dữ liệu điểm
                                        danh</a>
                                </li>
                                <li className="nav-item ">
                                    <a href="#" className="nav-link active"><i className="bi bi-binoculars"></i> Chi tiết</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>
                {/* <!-- Main --> */}
                <main className="py-2 bg-surface-secondary">
                    <div className="container">
                        <div className="mb-5 row">
                            <div className="d-flex justify-content-center">
                                <h2 className="text-primary">Lập trình hướng đối tượng N01 (300201) </h2>
                            </div>
                        </div>
                        <div className="p-5 border border-dark">
                            <div className="mb-2 row">
                                <div className="col-6 d-flex justify-content-center">
                                    <h3>Thông tin sinh viên</h3>
                                </div>
                                <div className="col-6 d-flex justify-content-center">
                                    <h3>Thông tin môn học</h3>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-3 d-flex justify-content-start">
                                    <p><b>Tên sinh viên:</b> Trịnh Trường Duy</p>
                                </div>
                                <div className="col-3 d-flex justify-content-start">
                                    <p><b>MSSV:</b> 52000655</p>
                                </div>
                                <div className="col-3 d-flex justify-content-start">
                                    <p><b>Tên môn học:</b> Lập trình hướng đối tượng </p>
                                </div>
                                <div className="col-3 d-flex justify-content-start">
                                    <p><b>Mã môn học:</b> 300201</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3 d-flex justify-content-start">
                                    <p><b>Ngành:</b> Kỹ Thuật Phần Mềm</p>
                                </div>
                                <div className="col-3 d-flex justify-content-start">
                                    <p><b>Lớp:</b> 20050261</p>
                                </div>
                                <div className="col-3 d-flex justify-content-start">
                                    <p><b>Tên giảng viên:</b> ThS.NCS Vũ Đình Hồng </p>
                                </div>
                                <div className="col-3 d-flex justify-content-start">
                                    <p><b>Nhóm học:</b> Nhóm 01</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                </div>
                                <div className="col-3 d-flex justify-content-start">
                                    <p><b>Tuần học:</b> 10 - 18</p>
                                </div>
                                <div className="col-3 d-flex justify-content-start">
                                    <p><b>Tổng số buổi:</b> 10 </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                </div>

                                <div className="col-3 d-flex justify-content-start">
                                    <p><b>Ca học:</b> 01</p>
                                </div>
                                <div className="col-3 d-flex justify-content-start">
                                    <p><b>Giờ học:</b> 6:50 - 9:15 </p>
                                </div>
                            </div>
                        </div>
                        <div className="m-2 border border-dark row">
                            <table className="table table-striped">
                                <thead>
                                    <tr className="table-primary">
                                        <th scope="col"><b>Buổi</b></th>
                                        <th scope="col"><b>MSSV</b></th>
                                        <th scope="col"><b>Trạng thái</b></th>
                                        <th scope="col"><b>Chi tiết</b></th>
                                        <th scope="col"><b>Khiếu nại</b></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>52000655</td>
                                        <td className="text-success">Có mặt</td>
                                        <td><a className="card-link" type="button" data-bs-toggle="modal"
                                            data-bs-target="#detailAttendanceModal">Xem chi tiết</a></td>
                                        <td><button><i class="bi bi-flag"></i> Khiếu nại</button></td>

                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>52000655</td>
                                        <td className="text-danger">Vắng</td>
                                        <td><a href="">Xem chi tiết</a></td>
                                        <td><button><i class="bi bi-flag"></i> Khiếu nại</button></td>


                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>52000655</td>
                                        <td className="text-warning">Trễ</td>
                                        <td><a href="">Xem chi tiết</a></td>
                                        <td><button><i class="bi bi-flag"></i> Khiếu nại</button></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>52000655</td>
                                        <td className="text-success">Có mặt</td>
                                        <td><a className="card-link" type="button" data-bs-toggle="modal"
                                            data-bs-target="#detailAttendanceModal">Xem chi tiết</a></td>
                                        <td><button><i class="bi bi-flag"></i> Khiếu nại</button></td>

                                    </tr>
                                    <tr>
                                        <th scope="row">5</th>
                                        <td>52000655</td>
                                        <td className="text-success">Có mặt</td>
                                        <td><a className="card-link" type="button" data-bs-toggle="modal"
                                            data-bs-target="#detailAttendanceModal">Xem chi tiết</a></td>
                                        <td><button><i class="bi bi-flag"></i> Khiếu nại</button></td>

                                    </tr>
                                    <tr>
                                        <th scope="row">6</th>
                                        <td>52000655</td>
                                        <td className="text-success">Có mặt</td>
                                        <td><a className="card-link" type="button" data-bs-toggle="modal"
                                            data-bs-target="#detailAttendanceModal">Xem chi tiết</a></td>
                                        <td><button><i class="bi bi-flag"></i> Khiếu nại</button></td>

                                    </tr>

                                    <tr>
                                        <th>Tổng: 10</th>
                                        <th>52000655</th>
                                        <th>Bình thường</th>
                                        <th>Tổng vắng: 01</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                    {/* <!-- Modal --> */}
                    <div className="modal fade" id="detailAttendanceModal" tabIndex="-1"
                        aria-labelledby="detailAttendanceModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="detailAttendanceModalLabel">Chi tiết điểm danh</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <h2 className="d-flex justify-content-center text-primary">
                                        Lập trình hướng đối tượng N01 (300201)
                                    </h2>
                                    <p className="d-flex justify-content-center">
                                        Ths.NCS Vu Dinh Hong | Nhóm 01
                                    </p>
                                    <span className="d-flex justify-content-between">
                                        <p><b>Trạng thái: </b> Có mặt
                                        </p>
                                        <p><b>Buổi: </b> 01
                                        </p>
                                        <p><b>Ca học: </b> 01 (6:50 - 9:15)
                                        </p>
                                        <p><b>Giờ điểm danh: </b> 6:53
                                        </p>
                                    </span>
                                    <span className="mb-5 d-flex justify-content-start">
                                        <p><b>Ghi chú(nếu có): </b> Không có ghi chú
                                        </p>
                                    </span>
                                    <div className="row">
                                        <div className="col-6 d-flex justify-content-center">
                                            <img src="https://via.placeholder.com/150" alt="Ảnh khuôn mặt gốc" />
                                        </div>
                                        <div className="col-6 d-flex justify-content-center">
                                            <img src="https://via.placeholder.com/150" alt="Ảnh khuôn mặt lúc điểm danh" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 d-flex justify-content-center"><i>Ảnh khuôn mặt gốc</i></div>
                                        <div className="col-6 d-flex justify-content-center"><i>Ảnh khuôn mặt lúc điểm danh</i></div>
                                    </div>
                                </div>
                                <div className="modal-footer d-flex justify-content-between">
                                    <button type="button" className="btn btn-danger">Khiếu nại</button>
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>


                                </div>
                            </div>
                        </div>
                    </div>
                </main>

            </div>
        </div>
    )
}