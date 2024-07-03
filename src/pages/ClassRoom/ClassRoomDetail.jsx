import React, { useEffect } from "react"
import NavBar from "../../components/NavBar"
export const ClassRoomDetail = () => {
    useEffect(() => {
        document.title = "Phòng học"
    }, [])
    // console.log("render notifi");
    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full">
            {/* <!-- Vertical Navbar --> */}
            <NavBar />

            {/* <!-- Main content --> */}
            <div className="h-screen flex-grow-1 overflow-y-lg-auto">
                <header className="bg-surface-primary border-bottom pt-3">
                    <div className="container">
                        <div className="mb-npx">
                            <div className="row align-items-center">
                                <div className="col-sm-6 col-12 mb-4 mb-sm-0">
                                    {/* <!-- Title --> */}
                                    <h1 className="h2 mb-0 ls-tight">
                                        PHÒNG LẬP TRÌNH HƯỚNG ĐỐI TƯỢNG
                                    </h1>
                                </div>
                            </div>
                            {/* <!-- Nav --> */}
                            <ul className="nav nav-tabs overflow-x border-0">
                                <li className="nav-item ">
                                    <a href="/" className="nav-link font-regular"><i className="bi bi-house"></i> Trang chủ</a>
                                </li>
                                <li className="nav-item ">
                                    <a href="/classroom" className="nav-link font-regular "><i className="bi bi-people"></i> Phòng học</a>
                                </li>
                                <li className="nav-item ">
                                    <a href="" className="nav-link active"><i className="bi bi-1-square"></i> Phòng lập trình hướng đối tượng</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>
                <main className="py-6 bg-surface-secondary">
                    <div className="container ps-20 pe-20">
                        <div className="row classroomDetailHeader">
                            <img src="https://i.pinimg.com/564x/17/f8/bd/17f8bdc442823c9943fd1681445cd5ef.jpg" alt="" style={{ width: '100%', height: '300px' }} />
                            <h2 className="overlay-text">Môn Lập trình hướng đối tượng | N1-HK1-300401</h2>
                            <h3 className="overlay-text2">GV: Vũ Đình Hồng</h3>

                        </div>
                        <div className="main-classroom">
                            <div className="row mt-2">
                                <div className="col-9">
                                    <div className="card post-classroom">
                                        <div className="card-header d-flex justify-content-start">
                                            <img src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="ảnh giảng viên..."
                                                className="rounded-circle" width="50" />
                                            <div className="infoTeacherPost">
                                                <h5>Vũ Đình Hồng</h5>
                                                <p>Aug 8,2024</p>
                                            </div>

                                        </div>
                                        <div className="card-body">
                                            <ul>
                                                <li>1.1: Giới thiệu về lập trình hướng đối tượng</li>
                                                <li>1.2: Các khái niệm cơ bản</li>
                                                <li>1.3: Các nguyên tắc cơ bản</li>
                                            </ul>
                                            <div className="file-display">
                                                <a href="https://docs.google.com/spreadsheets/d/1XCA4Sx_ARIpe7rMa8gq2SUhv6N7cQLa2_DibBVY2ctA/edit?gid=1695479590#gid=1695479590" target="_blank" className="file-link">
                                                    <img src="https://lh3.googleusercontent.com/drive-storage/AJQWtBOPlCP5jv0j4AMwemI0MVMUnB_h2dfMVCj2T_6Rgs-tvE6iNhNArEfJPqUfTNVFPX458X6fuVH2OAU1VptuH6FIFjRJqwM5jm51tOOEOJj-u5k=w105-h70-c" alt="" width={105} height={70} />
                                                    Ngân sách hàng năm.xlsx
                                                </a>
                                            </div>
                                        </div>
                                        <div className="card-footer d-flex justify-content-between">
                                            <img src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="ảnh giảng viên..."
                                                className="rounded-circle" width="40" />
                                            <input className="commentPost" type="text" placeholder="Nhập bình luận..." />

                                            <button className="btnCommentPost bg-soft-success text-success"><i className="bi bi-send"></i> Gửi</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-3">
                                    <div className="card event-classroom">
                                        <div className="card-header">
                                            <h3>Sự kiện</h3>
                                        </div>
                                        <div className="card-body">
                                            <ul>
                                                <li>21/01: Các em nộp bài lab01</li>
                                                <li>22/01: Các em nộp bài lab02</li>
                                                <li>23/01: Các em nộp bài lab03</li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-9">
                                    <div className="card post-classroom">
                                        <div className="card-header d-flex justify-content-start">
                                            <img src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="ảnh giảng viên..."
                                                className="rounded-circle" width="50" />
                                            <div className="infoTeacherPost">
                                                <h5>Vũ Đình Hồng</h5>
                                                <p>Aug 8,2024</p>
                                            </div>

                                        </div>
                                        <div className="card-body">
                                            <ul>
                                                <li>1.1: Giới thiệu về lập trình hướng đối tượng</li>
                                                <li>1.2: Các khái niệm cơ bản</li>
                                                <li>1.3: Các nguyên tắc cơ bản</li>
                                            </ul>
                                            <div className="file-display">
                                                <a href="https://docs.google.com/spreadsheets/d/1XCA4Sx_ARIpe7rMa8gq2SUhv6N7cQLa2_DibBVY2ctA/edit?gid=1695479590#gid=1695479590" target="_blank" className="file-link">
                                                    <img src="https://lh3.googleusercontent.com/drive-storage/AJQWtBOPlCP5jv0j4AMwemI0MVMUnB_h2dfMVCj2T_6Rgs-tvE6iNhNArEfJPqUfTNVFPX458X6fuVH2OAU1VptuH6FIFjRJqwM5jm51tOOEOJj-u5k=w105-h70-c" alt="" width={105} height={70} />
                                                    Ngân sách hàng năm.xlsx
                                                </a>
                                            </div>
                                        </div>
                                        <div className="card-footer d-flex justify-content-between">
                                            <img src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="ảnh giảng viên..."
                                                className="rounded-circle" width="40" />
                                            <input className="commentPost" type="text" placeholder="Nhập bình luận..." />

                                            <button className="btnCommentPost bg-soft-success text-success"><i className="bi bi-send"></i> Gửi</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </main>

            </div>
        </div>
    )
}