import React, { useEffect } from "react"
import NavBar from "../../components/NavBar"
import "../../assets/css/classroom.css"
export const ClassRoom = () => {
    useEffect(() => {
        document.title = "Phòng học"
    }, [])
    // console.log("render notifi");
    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
            <NavBar />
            <div className="h-screen flex-grow-1 overflow-y-lg-auto">
                <header className="bg-surface-primary border-bottom pt-3">
                    <div className="container">
                        <div className="mb-npx">
                            <div className="row align-items-center">
                                <div className="col-sm-6 col-12 mb-4 mb-sm-0">
                                    <h1 className="h2 mb-0 ls-tight">
                                        PHÒNG HỌC
                                    </h1>
                                </div>
                            </div>
                            <ul className="nav nav-tabs overflow-x border-0">
                                <li className="nav-item ">
                                    <a href="/" className="nav-link font-regular"><i className="bi bi-house"></i> Trang chủ</a>
                                </li>
                                <li className="nav-item ">
                                    <a href="/classroom" className="nav-link active"><i className="bi bi-people"></i> Phòng học</a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </header>
                <main className="py-6 bg-surface-secondary">
                    <div className="container">
                        <div className=" row">
                            <div className="col-4 mb-5">
                                <div class="card" >
                                    <div class="card-body">
                                        <div class="card-title classroom ps-2 pt-1 mb-2" style={{ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` }}>
                                            <h5><a href="" className="nameofSubject text-black">Lớp lập trình hướng đối tượng</a></h5>
                                            <p>Object - Orented Programing</p>
                                            <img src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="ảnh giảng viên..."
                                                className="rounded-circle position-absolute bottom-30 end-10" width="70" />

                                        </div>
                                        <div className="card-text mb-2">
                                            <p><b>Giáo viên: </b>Nguyễn Văn A</p>
                                            <p><b>Phòng: </b>A1-101 | <b>Nhóm: </b> 01</p>
                                        </div>
                                        <div className="joinRoomBtn d-flex justify-content-end">
                                            <a href="/classroom/detail" class="btn btn-success ">Vào phòng học <i class="bi bi-arrow-bar-right"></i></a>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 mb-5">
                                <div class="card" >
                                    <div class="card-body">
                                        <div class="card-title classroom ps-2 pt-1 mb-2" style={{ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` }}>
                                            <h5><a href="" className="nameofSubject text-black">Lớp lập trình hướng đối tượng</a></h5>
                                            <p>Object - Orented Programing</p>
                                            <img src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="ảnh giảng viên..."
                                                className="rounded-circle position-absolute bottom-30 end-10" width="70" />

                                        </div>
                                        <div className="card-text mb-2">
                                            <p><b>Giáo viên: </b>Nguyễn Văn A</p>
                                            <p><b>Phòng: </b>A1-101 | <b>Nhóm: </b> 01</p>
                                        </div>
                                        <div className="joinRoomBtn d-flex justify-content-end">
                                            <a href="#" class="btn btn-success ">Vào phòng học <i class="bi bi-arrow-bar-right"></i></a>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 mb-5">
                                <div class="card" >
                                    <div class="card-body">
                                        <div class="card-title classroom ps-2 pt-1 mb-2" style={{ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` }}>
                                            <h5><a href="" className="nameofSubject text-black">Lớp lập trình hướng đối tượng</a></h5>
                                            <p>Object - Orented Programing</p>
                                            <img src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="ảnh giảng viên..."
                                                className="rounded-circle position-absolute bottom-30 end-10" width="70" />

                                        </div>
                                        <div className="card-text mb-2">
                                            <p><b>Giáo viên: </b>Nguyễn Văn A</p>
                                            <p><b>Phòng: </b>A1-101 | <b>Nhóm: </b> 01</p>
                                        </div>
                                        <div className="joinRoomBtn d-flex justify-content-end">
                                            <a href="#" class="btn btn-success ">Vào phòng học <i class="bi bi-arrow-bar-right"></i></a>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 mb-5">
                                <div class="card" >
                                    <div class="card-body">
                                        <div class="card-title classroom ps-2 pt-1 mb-2" style={{ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` }}>
                                            <h5><a href="" className="nameofSubject text-black">Lớp lập trình hướng đối tượng</a></h5>
                                            <p>Object - Orented Programing</p>
                                            <img src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="ảnh giảng viên..."
                                                className="rounded-circle position-absolute bottom-30 end-10" width="70" />

                                        </div>
                                        <div className="card-text mb-2">
                                            <p><b>Giáo viên: </b>Nguyễn Văn A</p>
                                            <p><b>Phòng: </b>A1-101 | <b>Nhóm: </b> 01</p>
                                        </div>
                                        <div className="joinRoomBtn d-flex justify-content-end">
                                            <a href="#" class="btn btn-success ">Vào phòng học <i class="bi bi-arrow-bar-right"></i></a>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 mb-5">
                                <div class="card" >
                                    <div class="card-body">
                                        <div class="card-title classroom ps-2 pt-1 mb-2" style={{ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` }}>
                                            <h5><a href="" className="nameofSubject text-black">Lớp lập trình hướng đối tượng</a></h5>
                                            <p>Object - Orented Programing</p>
                                            <img src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="ảnh giảng viên..."
                                                className="rounded-circle position-absolute bottom-30 end-10" width="70" />

                                        </div>
                                        <div className="card-text mb-2">
                                            <p><b>Giáo viên: </b>Nguyễn Văn A</p>
                                            <p><b>Phòng: </b>A1-101 | <b>Nhóm: </b> 01</p>
                                        </div>
                                        <div className="joinRoomBtn d-flex justify-content-end">
                                            <a href="/classroom/detail" class="btn btn-success ">Vào phòng học <i class="bi bi-arrow-bar-right"></i></a>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 mb-5">
                                <div class="card" >
                                    <div class="card-body">
                                        <div class="card-title classroom ps-2 pt-1 mb-2" style={{ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` }}>
                                            <h5><a href="" className="nameofSubject text-black">Lớp lập trình hướng đối tượng</a></h5>
                                            <p>Object - Orented Programing</p>
                                            <img src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="ảnh giảng viên..."
                                                className="rounded-circle position-absolute bottom-30 end-10" width="70" />

                                        </div>
                                        <div className="card-text mb-2">
                                            <p><b>Giáo viên: </b>Nguyễn Văn A</p>
                                            <p><b>Phòng: </b>A1-101 | <b>Nhóm: </b> 01</p>
                                        </div>
                                        <div className="joinRoomBtn d-flex justify-content-end ">
                                            <a href="#" class="btn btn-success">Vào phòng học <i class="bi bi-arrow-bar-right"></i></a>
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