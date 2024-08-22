import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userService } from '../../services/userService';
import Swal from 'sweetalert2';

function EditProfileContent() {

    const user = useSelector(state => state.auth.user);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        if (user) {
            fetchProfileData()
        }
    }, [])
    const fetchProfileData = async () => {
        const response = await userService.getProfile();

        if (response.status !== 200) {
            return Swal.fire({
                icon: 'error',
                title: "Không tìm thấy thông tin người dùng",
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            setUserData(response.metadata);

        }
    }
    return (

        <div className="row">
            <div className="col-xl-4">
                <div className="card mb-4 mb-xl-0">
                    <div className="card-header text-bg-info">Chân dung gốc</div>
                    <div className="card-body text-center">
                        <img className="img-account-profile rounded-circle mb-2" src={userData.avatar_path} alt="Ảnh người dùng" />
                    </div>
                </div>
            </div>
            <div className="col-xl-8">
                <div className="card mb-4">
                    <div className="card-header text-bg-info">Thông tin cơ bản</div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="studentID">MSSV</label>
                            <input className="form-control" id="studentID" type="text" disabled value={userData.username} />
                        </div>

                        <div className="row gx-3 mb-3">
                            <div className="col-md-12">
                                <label className="small mb-1" htmlFor="nickname">Họ và tên</label>
                                <input className="form-control" id="nickname" type="text" disabled value={userData.nickname} />
                            </div>

                        </div>
                        <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="major">Chuyên ngành</label>
                                <input className="form-control" id="major" type="text" disabled value={userData.faculty_name} />
                            </div>
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="faculty">Khoa</label>
                                <input className="form-control" id="faculty" type="text" disabled value={userData.faculty_name} />
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="admission">Khóa</label>
                                <input className="form-control" id="admission" type="text" disabled value={userData.course_year} />
                            </div>
                            {userData.gender ? (<div className="col-md-6">
                                <label className="small mb-1" htmlFor="gender">Giới tính</label>
                                <input className="form-control" id="gender" type="text" disabled value="Nam" />
                            </div>) : (<div className="col-md-6">
                                <label className="small mb-1" htmlFor="gender">Giới tính</label>
                                <input className="form-control" id="gender" type="text" disabled value="Nữ" />
                            </div>)}

                        </div>
                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="studentEmail">Email sinh viên</label>
                            <input className="form-control" id="studentEmail" type="email" disabled value={userData.email} />
                        </div>
                        <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputPhone">Số điện thoại</label>
                                <input className="form-control" id="inputPhone" type="tel" disabled value={userData.phone} />
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
                            <a href="/changePassword" type="button " className="text-white col-md-2 btn btn-info">Đổi mật khẩu</a>
                            <button className="col-md-1 btn btn-success" type="submit" >Lưu</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default React.memo(EditProfileContent);
