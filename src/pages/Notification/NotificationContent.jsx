import React from 'react';

function NotificationContent() {
    return (
        <div> 
            <main className="py-6 bg-surface-secondary">
                <div className="container">
                    <div className="row mb-2">
                        <div className="col-6">
                            <input type="search" className="form-control" id="datatable-search-input"
                                placeholder="Tìm kiếm theo tiêu đề..." />
                        </div>
                        <div className="col-4">
                            <input type="search" className="form-control" id="datatable-search-input"
                                placeholder="Tìm kiếm theo tên người thông báo..." />
                        </div>
                        <div className="col-2">
                            <button className="btn btn-outline-danger"> <i className="bi bi-x-lg"></i>
                                Xóa</button>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-4">
                            <select className="form-select" aria-label="Default select example">
                                <option defaultValue={"none"}>Chọn loại thông báo</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div className="col-3">
                            <div className="d-flex justify-content-evenly">
                                <label htmlFor="" className="mt-2">Từ: </label>
                                <input className="form-control" type="date" placeholder="Đến ngày" />
                            </div>
                        </div>

                        <div className="col-3">
                            <div className="d-flex justify-content-evenly">
                                <label htmlFor="" className="mt-2">Đến: </label>
                                <input className="form-control" type="date" placeholder="Đến ngày" />
                            </div>
                        </div>

                        <div className="col-2">
                            <button className="btn btn-outline-primary"> <i className="bi bi-search"></i>
                                Tìm kiếm</button>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-3 mt-2 d-flex justify-content-center">
                            <h5> Trang 1 trong 93 trang
                            </h5>
                        </div>
                        <div className="col-9">
                            <nav aria-label="page-notification">
                                <ul className="pagination">
                                    <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                        </a>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">...</a></li>
                                    <li className="page-item"><a className="page-link" href="#">91</a></li>
                                    <li className="page-item"><a className="page-link" href="#">92</a></li>
                                    <li className="page-item"><a className="page-link" href="#">93</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                    </div>
                    <div className="div-notification">
                        <div className="row mt-4">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title text-primary" > <p
                                            className="badge badge-pill bg-soft-success text-success me-2">
                                            Đã lưu
                                        </p>DANH SÁCH THI CUỐI KỲ HK 2/2023-2024 (BẮT ĐẦU THI TỪ
                                            27/05/2024)</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">Ths.NCS Vu Dinh Hong | Ngày đăng:
                                            25/05/2024</h6>
                                        <p className="card-text">Sinh viên xem Danh sách thi cuối kỳ HK 2/2023-2024 trong
                                            thông báo.</p>
                                        <a className="card-link" type="button" data-bs-toggle="modal"
                                            data-bs-target="#detailNotificationModal">Xem chi tiết</a>
                                        <button className="btn btn-outline-danger btnSaveNotification"><i
                                            className="bi bi-save"></i>
                                            Lưu</button>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title text-primary"><p
                                            className="badge badge-pill bg-soft-danger text-danger me-2">
                                            Chưa xem
                                        </p>DANH SÁCH THI CUỐI KỲ HK 2/2023-2024 (BẮT ĐẦU THI TỪ
                                            27/05/2024)</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">Ths.NCS Vu Dinh Hong | Ngày đăng:
                                            25/05/2024</h6>
                                        <p className="card-text">Sinh viên xem Danh sách thi cuối kỳ HK 2/2023-2024 trong
                                            thông báo.</p>
                                        <a className="card-link" type="button" data-bs-toggle="modal"
                                            data-bs-target="#detailNotificationModal">Xem chi tiết</a>
                                        <button className="btn btn-outline-danger btnSaveNotification"><i
                                            className="bi bi-save"></i>
                                            Lưu</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title text-primary">DANH SÁCH THI CUỐI KỲ HK 2/2023-2024 (BẮT ĐẦU THI TỪ
                                            27/05/2024)</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">Ths.NCS Vu Dinh Hong | Ngày đăng:
                                            25/05/2024</h6>
                                        <p className="card-text">Sinh viên xem Danh sách thi cuối kỳ HK 2/2023-2024 trong
                                            thông báo.</p>
                                        <a className="card-link" type="button" data-bs-toggle="modal"
                                            data-bs-target="#detailNotificationModal">Xem chi tiết</a>
                                        <button className="btn btn-outline-danger btnSaveNotification"><i
                                            className="bi bi-save"></i>
                                            Lưu</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title text-primary">DANH SÁCH THI CUỐI KỲ HK 2/2023-2024 (BẮT ĐẦU THI TỪ
                                            27/05/2024)</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">Ths.NCS Vu Dinh Hong | Ngày đăng:
                                            25/05/2024</h6>
                                        <p className="card-text">Sinh viên xem Danh sách thi cuối kỳ HK 2/2023-2024 trong
                                            thông báo.</p>
                                        <a className="card-link" type="button" data-bs-toggle="modal"
                                            data-bs-target="#detailNotificationModal">Xem chi tiết</a>
                                        <button className="btn btn-outline-danger btnSaveNotification"><i
                                            className="bi bi-save"></i>
                                            Lưu</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <nav aria-label="page-notification" className="d-flex justify-content-center">
                                <ul className="pagination">
                                    <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                        </a>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">...</a></li>
                                    <li className="page-item"><a className="page-link" href="#">91</a></li>
                                    <li className="page-item"><a className="page-link" href="#">92</a></li>
                                    <li className="page-item"><a className="page-link" href="#">93</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>

            </main>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="detailNotificationModal" tabIndex="-1"
                aria-labelledby="detailNotificationModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="detailNotificationModalLabel">Chi tiết thông báo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h2 className="d-flex justify-content-center text-primary">
                                DANH SÁCH THI CUỐI KỲ HK 2/2023-2024 (BẮT ĐẦU THI TỪ 27/05/2024)
                            </h2>
                            <p className="d-flex justify-content-center">
                                Ths.NCS Vu Dinh Hong | Ngày đăng: 25/05/2024
                            </p>
                            <span className="d-flex justify-content-start">
                                Sinh viên xem Danh sách thi cuối kỳ HK 2/2023-2024 trong thông báo.
                            </span>
                            Lưu ý:

                            - Danh sách sẽ được cập nhật trước ngày thi ít nhất 02 ngày.
                            - Sinh viên phải có mặt tại phòng thi trước giờ thi ít nhất 30 phút
                            - Sinh viên xem lịch thi/danh sách thi trong file đính kèm.
                            - Sinh viên phải mang theo thẻ sinh viên hoặc CCCD khi vào phòng dự thi.

                            - Các trường hợp thắc mắc về lịch thi vui lòng liên hệ phòng Đại học (A0005) hoặc email:
                            phongdaihoc@tdtu.edu.vn

                            - SV xem lịch thi cá nhân trong mục "Lịch thi" trên cổng thông tin sinh viên.

                            - SV xem lịch thi tổng quát trong mục "Thông báo" trên cổng thông tin sinh viên

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            {/* <!-- <button type="button" className="btn btn-primary">Save changes</button> --> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default React.memo(NotificationContent);
