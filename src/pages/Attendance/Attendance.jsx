import React, { useEffect } from "react"
import { NavBar } from "../../components/NavBar"
import { Header } from "../../components/Header"
export const Attendance = () => {
    useEffect(() => {
        document.title = "Dữ liệu điểm danh"
    }, [])
    // console.log("render notifi");
    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
            <NavBar />
            <div className="h-screen flex-grow-1 overflow-y-lg-auto">
                <header class="bg-surface-primary border-bottom pt-6">
                    <div class="container">
                        <div class="mb-npx">
                            <div class="row align-items-center">
                                <div class="col-sm-6 col-12 mb-4 mb-sm-0">
                                    <h1 class="h2 mb-0 ls-tight">
                                        DỮ LIỆU ĐIỂM DANH
                                    </h1>
                                </div>
                            </div>
                            <ul class="nav nav-tabs overflow-x border-0">
                                <li class="nav-item ">
                                    <a href="#" class="nav-link font-regular"><i class="bi bi-house"></i> Trang chủ</a>
                                </li>
                                <li class="nav-item ">
                                    <a href="#" class="nav-link active"><i class="bi bi-clipboard-data"></i> Dữ liệu điểm
                                        danh</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>
                {/* <!-- Main --> */}
                <main class="py-6 bg-surface-secondary">
                    <div class="container">
                        <div class="row">
                            <div class="col-7">
                                <div class="form-group">
                                    <select id="selectSemester" class="form-select" data-live-search="true">
                                        <option selected>--Chọn học kỳ | Choose semester--</option>
                                        <option value="2">Học kỳ 2/2023-2024 | 2nd Semester/2023-2024</option>
                                        <option value="3">Học kỳ 1/2023-2024 | 1st Semester/2023-2024</option>
                                        <option value="4">Học kỳ 3/2022-2023 | 3rd Semester/2022-2023</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-5">
                                <div class="form-group">
                                    <select id="selectSubject" class="form-select" data-live-search="true">
                                        <option selected>--Chọn môn học cần xem dữ liệu điểm danh--</option>
                                        <option value="2">Lập trình hướng đối tượng</option>
                                        <option value="3">Kiến trúc hướng dịch vụ</option>
                                        <option value="4">Mẫu thiết kế</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div class="row mt-4">
                            <div class="col-12">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col" ><p class="fw-bold">Môn học</p></th>
                                            <th scope="col">Lịch học</th>
                                            <th scope="col">Tình trạng</th>
                                            <th scope="col">Tổng vắng</th>
                                            <th scope="col">Chi tiết</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Lập trình hướng đối tượng (300201) | N01</th>
                                            <td>Ca: 1 | Tuần: 6,7,8...10,11</td>
                                            <td class="text-warning">Bình thường</td>
                                            <td>0</td>
                                            <td><a href="/attendanceDetail">Xem chi tiết</a></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Mẫu thiết kế (400201) | N02</th>
                                            <td>Ca: 2 | Tuần: 6,7,8...10,11</td>
                                            <td class="text-danger">Cấm thi</td>
                                            <td>4</td>
                                            <td><a href="">Xem chi tiết</a></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Khóa luận tốt nghiệp (500686) | N01</th>
                                            <td>None</td>
                                            <td class="text-success">Đã hoàn thành</td>
                                            <td>0</td>
                                            <td><a href="">Xem chi tiết</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </main>

            </div>
        </div>
    )
}