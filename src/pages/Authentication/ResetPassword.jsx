import React, { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';


export const ResetPassword = () => {
    const navigate = useNavigate();
    const [resetPassword, setResetPassword] = useState({
        newPassword: '',
        repeatNewPassword: ''
    })
    const { '*': token } = useParams();
    useEffect(() => {
        window.title = 'Hệ thống điểm danh';
    }, [])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setResetPassword({ ...resetPassword, [name]: value });
    }
    const checkPass = (password) => {
        const minLength = /.{8,}/;
        const hasNumber = /\d/;
        const hasUpperCase = /[A-Z]/;

        if (!minLength.test(password)) {
            return "Mật khẩu phải có ít nhất 8 ký tự!";
        }
        if (!hasNumber.test(password)) {
            return "Mật khẩu phải chứa ít nhất một số!";
        }
        if (!hasUpperCase.test(password)) {
            return "Mật khẩu phải chứa ít nhất một chữ cái viết hoa!";
        }
        return null; // Password is valid
    };
    const handleResetPassword = async (e) => {
        e.preventDefault();
        const validationMessage = checkPass(resetPassword.newPassword);
        if (validationMessage !== null) {
            Swal.fire("Cảnh báo!", validationMessage, "warning", 1500);
            return;
        }

        if (resetPassword.newPassword !== resetPassword.repeatNewPassword) {
            Swal.fire("Cảnh báo!", "Mật khẩu mới không khớp với mật khẩu nhập lại!", "warning", 1500)
            return
        }
        try {
            const response = await authService.resetPassword(token, resetPassword.newPassword);

            if (response.status === 200) {
                Swal.fire("Thành công!", "Mật khẩu của bạn đã được đặt lại thành công.", "success")
                    .then(() => {
                        navigate("/login");
                    });
            }
        } catch (err) {
            if (err.response && err.response.status === 400) {
                Swal.fire("Lỗi!", "Token đã hết hạn hoặc không hợp lệ. Vui lòng thử lại.", "error");
            } else {
                Swal.fire("Lỗi!", err.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại sau.", "error");
            }
        }
    }
    return (
        <div className="container-fluid">
            <div className="loginDiv">
                <div className="loginHeader">
                    <h3>HỆ THỐNG ĐIỂM DANH CA HỌC</h3>
                    <span className="schoolNameSpan"><p>Trường đại học Tôn Đức Thắng</p></span>
                </div>
                <div className="loginBody">
                    <h5 className='text-center'>ĐỔI MỚI MẬT KHẨU</h5>
                    <form onSubmit={handleResetPassword}>
                        <div className="form-group">
                            <label htmlFor="newPassword">Mật khẩu mới:</label>
                            <input type="password" className="form-control" id="newPassword" name='newPassword' value={resetPassword.newPassword} onChange={handleChange} aria-describedby="textStudentID" placeholder="Nhập mật khẩu mới..." />
                        </div>
                        <div className="form-group">
                            <label htmlFor="repeatNewPassword">Nhập lại mật khẩu mới:</label>
                            <input type="password" className="form-control" id="repeatNewPassword" name='repeatNewPassword' value={resetPassword.repeatNewPassword} onChange={handleChange} aria-describedby="repeatNewPassword"
                                placeholder="Nhập lại mật khẩu..." />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Thay mật khẩu mới</button>
                        </div>
                    </form>
                </div>
                <span className="loginFooter">
                    Develop by: Phuoc Tran & Duy Trinh
                </span>
            </div>
        </div>

    );
};