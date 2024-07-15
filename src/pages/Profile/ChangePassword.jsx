import React, { useEffect, useState } from "react"
import NavBar from "../../components/NavBar"
export const ChangePassword = () => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(true);

    useEffect(() => {
        document.title = "Đổi mật khẩu"
    }, [])
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
                                <form>
                                    <legend><h4 className="text-danger">Nhập mật khẩu trên 8 ký tự và có ít nhất 1 kí tự số, 1 kí tự viết hoa.</h4>
                                    </legend>
                                    <div class="mb-3">
                                        <label for="currentPassword" class="form-label">Mật khẩu hiện tại:</label>
                                        <input type="password" class="form-control" id="currentPassword" required />
                                    </div>
                                    <div class="mb-3">
                                        <label for="newPassword" class="form-label">Mật khẩu mới:</label>
                                        <input type="password" class="form-control" id="newPassword" required />
                                    </div>
                                    <div class="mb-3">
                                        <label for="repeatNewPassword" class="form-label">Nhập lại mật khẩu mới:</label>
                                        <input type="password" class="form-control" id="repeatNewPassword" required />
                                    </div>
                                    <button type="submit" class="btn btn-primary">Lưu mật khẩu</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}