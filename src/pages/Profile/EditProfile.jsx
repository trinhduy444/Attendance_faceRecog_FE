import React, { useEffect } from "react"
import NavBar from "../../components/NavBar"
export const EditProfile = () => {
    useEffect(() => {
        document.title = "Chỉnh sửa thông tin cá nhân"
    }, [])
    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary" >
            <NavBar />
            <div className="container-xl overflow-y-auto ">

                <hr className="mt-0 mb-4" />
                <div className="row">
                    <div className="col-xl-4">
                        <div className="card mb-4 mb-xl-0">
                            <div className="card-header text-bg-info">Chân dung gốc</div>
                            <div className="card-body text-center">
                                <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8">
                        <div className="card mb-4">
                            <div className="card-header text-bg-info">Thông tin cơ bản</div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="studentID">MSSV</label>
                                    <input className="form-control" id="studentID" type="text" disabled value="52000655" />
                                </div>

                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="lastName">Họ lót</label>
                                        <input className="form-control" id="lastName" type="text" disabled value="Trịnh Trường" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="firstName">Tên</label>
                                        <input className="form-control" id="firstName" type="text" disabled value="Duy" />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="major">Chuyên ngành</label>
                                        <input className="form-control" id="major" type="text" disabled value="Kỹ thuật phần mềm" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="faculty">Khoa</label>
                                        <input className="form-control" id="faculty" type="text" disabled value="Công nghệ thông tin" />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="admission">Khóa</label>
                                        <input className="form-control" id="admission" type="text" disabled value="2020" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="gender">Giới tính</label>
                                        <input className="form-control" id="gender" type="text" disabled value="Nam" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="studentEmail">Email sinh viên</label>
                                    <input className="form-control" id="studentEmail" type="email" disabled value="52000655@student.tdtu.edu.vn" />
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputPhone">Số điện thoại</label>
                                        <input className="form-control" id="inputPhone" type="tel" disabled value="+84-344-511-607" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputBirthday">Ngày sinh</label>
                                        <input className="form-control" id="inputBirthday" type="text" name="birthday" disabled value="22/11/2002" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <div className="card mb-4">
                            <div className="card-header text-bg-info">Thông tin chi tiết</div>
                            <div className="card-body">
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="lastName">Ngày vào đoàn</label>
                                        <input className="form-control" id="lastName" type="text" disabled value="19/11/2018" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" >Cấp bậc cao nhất</label>
                                        <input className="form-control" type="text" disabled value="Ban chấp hành Chi đội" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="small mb-1" >Địa chỉ</label>
                                    <input className="form-control" type="text" disabled value="Tổ 10, khu vực 2, Bùi" />
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" >Cha</label>
                                        <input className="form-control" type="text" disabled value="Trịnh Văn Không Biết" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" >Năm sinh</label>
                                        <input className="form-control" type="text" disabled value="00/00/1900" />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="lastName">Mẹ</label>
                                        <input className="form-control" id="lastName" type="text" disabled value="Trịnh Thị Không Biết" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" >Năm sinh</label>
                                        <input className="form-control" type="text" disabled value="00/00/1900" />
                                    </div>
                                </div>
                                <div className="row m-2 d-flex justify-content-between">
                                    <button className="col-md-2 btn btn-info"><a href="/changePassword" className="text-white">Đổi mật khẩu</a></button>
                                    <button className="col-md-1 btn btn-success" type="submit" >Lưu</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}