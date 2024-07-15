import React from 'react';

function AttendanceContent() {
    return (
        <main className="py-6 bg-surface-secondary">
            <div className="container">
                <div className="row">
                    <div className="col-7">
                        <div className="form-group">
                            <select id="selectSemester" className="form-select" data-live-search="true">
                                <option selected>--Chọn học kỳ | Choose semester--</option>
                                <option value="2">Học kỳ 2/2023-2024 | 2nd Semester/2023-2024</option>
                                <option value="3">Học kỳ 1/2023-2024 | 1st Semester/2023-2024</option>
                                <option value="4">Học kỳ 3/2022-2023 | 3rd Semester/2022-2023</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="form-group">
                            <select id="selectSubject" className="form-select" data-live-search="true">
                                <option selected>--Chọn môn học cần xem dữ liệu điểm danh--</option>
                                <option value="2">Lập trình hướng đối tượng</option>
                                <option value="3">Kiến trúc hướng dịch vụ</option>
                                <option value="4">Mẫu thiết kế</option>
                            </select>
                        </div>
                    </div>

                </div>
                <div className="row mt-4">
                    <div className="col-12">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col" ><p className="fw-bold">Môn học</p></th>
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
                                    <td className="text-warning">Bình thường</td>
                                    <td>0</td>
                                    <td><a href="/attendance/detail">Xem chi tiết</a></td>
                                </tr>
                                <tr>
                                    <th scope="row">Mẫu thiết kế (400201) | N02</th>
                                    <td>Ca: 2 | Tuần: 6,7,8...10,11</td>
                                    <td className="text-danger">Cấm thi</td>
                                    <td>4</td>
                                    <td><a href="">Xem chi tiết</a></td>
                                </tr>
                                <tr>
                                    <th scope="row">Khóa luận tốt nghiệp (500686) | N01</th>
                                    <td>None</td>
                                    <td className="text-success">Đã hoàn thành</td>
                                    <td>0</td>
                                    <td><a href="">Xem chi tiết</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </main>

    );
}
export default React.memo(AttendanceContent);
