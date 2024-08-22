import React, { useEffect, useState } from "react"
import NavBar from "../../components/NavBar"
import { authService } from '../../services/authService';
import Swal from 'sweetalert2';

export const ChangePassword = () => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(true);
    const [currentPassword, setCurrentPassword] = useState(undefined);
    const [newPassword, setNewPassword] = useState(undefined);
    const [repeatNewPassword, setRepeatNewPassword] = useState(undefined);

    useEffect(() => {
        document.title = "Đổi mật khẩu"
    }, [])

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            if (newPassword.length < 7) {
                return Swal.fire({
                    icon: 'error',
                    title: "Mật khẩu mới phải có ít nhất 8 ký tự!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            if (newPassword !== repeatNewPassword) {
                return Swal.fire({
                    icon: 'error',
                    title: "Mật khẩu mới không khớp với nhập lại mật khẩu mới!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            const responeCheckPassword = await authService.checkPassword(currentPassword);
            // console.log(responeCheckPassword);
            if (responeCheckPassword.status === 200) {
                const responeChangePassword = await authService.changePassword(newPassword)
                if (responeChangePassword.status === 201) {
                    return Swal.fire({
                        icon: 'success',
                        title: "Đổi mật khẩu thành công",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                return Swal.fire({
                    icon: 'error',
                    title: "Mật khẩu phải có ít nhất một chữ cái hoa và một số",
                    showConfirmButton: false,
                    timer: 1500
                });

            } else {
                return Swal.fire({
                    icon: 'error',
                    title: "Mật khẩu hiện tại không đúng!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: err.message,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary" >
            <NavBar isNavBarVisible={isNavBarVisible} />
            <div className="h-screen flex-grow-1 overflow-y-lg-auto">
                <header className="bg-surface-primary border-bottom pt-3">
                    <div className="container">
                        <div className="mb-npx">
                            <div className="row align-items-center">
                                <div className="col-sm-6 col-12 mb-4 mb-sm-0">
                                    <h1 className="h2 mb-0 ls-tight">
                                        ĐỔI MẬT KHẨU
                                    </h1>
                                </div>
                            </div>
                            <ul className="nav nav-tabs overflow-x border-0">
                                <li className="nav-item ">
                                    <a href="/" className="nav-link font-regular"><i className="bi bi-house"></i> Trang chủ</a>
                                </li>
                                <li className="nav-item ">
                                    <a href="/changePassword" className="nav-link active"><i className="bi bi-arrow-left-right"></i> Dổi mật khẩu</a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </header>
                <main className="py-6 bg-body-tertiary">
                    <div className="container p-5 border border-dark-subtle bg-body-secondary">
                        <div className="d-flex align-items-center justify-content-center vh-20">
                            <div className="row">
                                <form onSubmit={handleChangePassword}>
                                    <legend><h4 className="text-danger">Nhập mật khẩu trên 8 ký tự và có ít nhất 1 kí tự số, 1 kí tự viết hoa.</h4>
                                    </legend>
                                    <div className="mb-3" style={{ display: 'none' }}>
                                        <label htmlFor="username">Tên người dùng</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            autoComplete="username"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="currentPassword" className="form-label">Mật khẩu hiện tại:</label>
                                        <input type="password" className="form-control" onChange={(e) => setCurrentPassword(e.target.value)} id="currentPassword" required autoComplete="current-password"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="newPassword" className="form-label">Mật khẩu mới:</label>
                                        <input type="password" className="form-control" onChange={(e) => setNewPassword(e.target.value)} id="newPassword" required autoComplete="new-password" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="repeatNewPassword" className="form-label">Nhập lại mật khẩu mới:</label>
                                        <input type="password" className="form-control" onChange={(e) => setRepeatNewPassword(e.target.value)} id="repeatNewPassword" required autoComplete="repeat-new-password" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Lưu mật khẩu</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}