import React, { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import Swal from 'sweetalert2';

export const ForgotPassword = () => {
    const [forgotData, setForgotData] = useState({
        username: '',
        email: ''
    })
    useEffect(() => {
        window.title = 'Hệ thống điểm danh';
    }, [])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForgotData({ ...forgotData, [name]: value });

    }
    const handleSubmitForgot = async (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Đang xử lý...',
            text: 'Vui lòng chờ giây lát',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            const response = await authService.forgotPassword(forgotData);
            console.log(response);

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công!',
                    text: 'Vui lòng kiểm tra email',
                    timer: 2000,
                    showConfirmButton: false,
                });
                setForgotData({
                    username: '',
                    email: ''
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Thất bại!',
                    text: response.data.message,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi!',
                text: 'Tài khoản và email không phải là một người trên hệ thống, hoặc tài khoản đã bị khóa.',
            });
        }
    };
    return (
        <div className="container-fluid">
            <div className="loginDiv">
                <div className="loginHeader">
                    <h3>HỆ THỐNG ĐIỂM DANH CA HỌC</h3>
                    <span className="schoolNameSpan"><p>Trường đại học Tôn Đức Thắng</p></span>
                </div>
                <div className="loginBody">
                    <h5 className='text-center'>QUÊN MẬT KHẨU</h5>
                    <form onSubmit={handleSubmitForgot}>
                        <div className="form-group">
                            <label htmlFor="username">Tên đăng nhập:</label>
                            <input type="text" className="form-control" id="username" name='username' value={forgotData.username} onChange={handleChange} aria-describedby="textStudentID" placeholder="Nhập tên đăng nhập..." />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" className="form-control" id="email" name='email' value={forgotData.email} onChange={handleChange} aria-describedby="email"
                                placeholder="Nhập email..." />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Gửi xác thực</button>
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