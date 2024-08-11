import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import sclogo from "../assets/images/sclogo.jpg";
import { authService } from '../services/authService';
import Swal from 'sweetalert2';

function NavBar({ isNavBarVisible }) {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);
    const isLoading = useSelector(state => state.auth.isLoading);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        const response = await authService.logout();
        // console.log(response);
        if (response.status === 200) {
            dispatch({ type: 'LOGOUT' })
            navigate('/login');
            Swal.fire({
                icon: 'success',
                title: response.message,
                showConfirmButton: false,
                timer: 1000
            });
        }
    }
    // useEffect(() => {
    //     if (accessToken) {
    //         const tokenExpiry = 10 * 60 * 1000;
    //         const bufferTime = 10 * 1000;

    //         const timeId = setTimeout(() => {
    //             handleLogout();
    //         }, tokenExpiry - bufferTime);

    //         return () => clearTimeout(timeId);
    //     }

    // }, [accessToken])

    console.log("navBar");
    if (!isNavBarVisible) {
        return null;
    }

    return (
        <nav className="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg"
            id="navbarVertical">
            {
                isAuthenticated ? (
                    <div className="container" >

                        <button className="navbar-toggler ms-n2" type="button" data-bs-toggle="collapse"
                            data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <a className="navbar-brand py-lg-2 mb-lg-5 px-lg-6 me-0" href="/">
                            <h3 className="text-success"><img src={sclogo} width="40" className="rounded-circle" /><span
                                className="text-info">Attendance</span>System</h3>
                        </a>

                        <div className="navbar-user d-lg-none">
                            <div className="dropdown">
                                <a href="#" id="sidebarAvatar" role="button" data-bs-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    <div className="avatar-parent-child">
                                        <img alt="Image Placeholder"
                                            src="https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                                            className="avatar avatar- rounded-circle" />
                                        <span className="avatar-child avatar-badge bg-success"></span>
                                    </div>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="sidebarAvatar">
                                    <a href="#" className="dropdown-item">Profile</a>
                                    <a href="#" className="dropdown-item">Settings</a>
                                    <a href="#" className="dropdown-item">Billing</a>
                                    <hr className="dropdown-divider" />
                                    <a href="#" className="dropdown-item">Logout</a>
                                </div>
                            </div>
                        </div>
                        <div className="collapse navbar-collapse" id="sidebarCollapse">
                            <ul className="navbar-nav">
                                <li className="nav-item ">
                                    <a className="nav-link active" href="/">
                                        <i className="bi bi-house"></i> Trang chủ
                                    </a>
                                </li>
                                <li className="nav-item dropdown" id="myDropdown">
                                    <a className="nav-link dropdown-toggle " href="#" id="navbarDropdown" role="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="bi bi-person-square"></i> {user.nickname}
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                        {user.role_id === 1 ? (<li><a className="dropdown-item" href="/editProfile"><i className="bi bi-person"> Thông tin admin</i></a></li>)
                                            : user.role_id === 2 ? (<li><a className="dropdown-item" href="/editProfile"><i className="bi bi-person"> Thông tin giáo vụ</i></a></li>)
                                                : user.role_id === 3 ? (<li><a className="dropdown-item" href="/editProfile"><i className="bi bi-person"> Thông tin sinh viên</i></a></li>)
                                                    : null
                                        }

                                        <li><a className="dropdown-item" href='/changePassword'><i className="bi bi-arrow-left-right"> Đổi mật
                                            khẩu</i></a></li>
                                    </ul>
                                </li>
                                {user.role_id === 3 ? (
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            <i className="bi bi-activity"></i> Hoạt động
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">

                                            <li><a className="dropdown-item" href="/notification"><i className="bi bi-bell"></i> Thông báo</a></li>
                                            <li><a className="dropdown-item" href="/schedule"><i className="bi bi-calendar2-week"></i> Thời khóa biểu</a></li>
                                            <li><a className="dropdown-item" href="#"><i className="bi bi-newspaper"></i> Tin tức</a></li>
                                            <li><a className="dropdown-item" href="/attendance"><i className="bi bi-clipboard-data"></i> Dữ liệu điểm danh</a></li>
                                            <li><a className="dropdown-item" href="/coursegroup"><i className="bi bi-people"></i> Nhóm học</a></li>
                                        </ul>
                                    </li>
                                ) : user.role_id === 2 ? (
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            <i className="bi bi-activity"></i> Hoạt động
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                            <li><a className="dropdown-item" href="/notification"><i className="bi bi-bell"></i> Thông báo</a></li>
                                            <li><a className="dropdown-item" href="/coursegroup"><i className="bi bi-people"></i> Nhóm học</a></li>
                                            <li><a className="dropdown-item" href="/attendanceData"><i className="bi bi-clipboard-data"></i> Quản lý dữ liệu điểm danh</a></li>
                                            <li><a className="dropdown-item" href="/teacher/userManagement"><i className="bi bi-people"></i> Quản lý sinh viên</a></li>
                                            <li><a className="dropdown-item" href="/attendance/scan"><i className="bi bi-clipboard-data">Điểm danh nhận diện khuôn mặt</i></a></li>
                                        </ul>
                                    </li>
                                ) : user.role_id === 1 ? (<li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <i className="bi bi-file-text"></i> Admin Dashboard
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="/admin/notifyManagement"><i className="bi bi-bell"> Quản lý thông báo</i></a></li>
                                        <li><a className="dropdown-item" href="/admin/userManagement"><i className="bi bi-people"> Quản lý sinh viên</i></a></li>
                                        <li><a className="dropdown-item" href="/admin/teacherManagement"><i className="bi bi-people"> Quản lý giảng viên</i></a></li>
                                        <li><a className="dropdown-item" href="/admin/classRoomManagement"><i className="bi bi-person"> Quản lý phòng học</i></a></li>
                                        <li><a className="dropdown-item" href="/admin/courseManagement"><i className="bi bi-book"> Quản lý môn học</i></a></li>
                                        <li><a className="dropdown-item" href="/admin/coursegroupManagement"><i className="bi bi-collection"> Quản lý nhóm học</i></a></li>
                                        <li><a className="dropdown-item" href="/admin/attendanceManagement"><i className="bi bi-clipboard-data"> Quản lý dữ liệu điểm danh</i></a></li>
                                        <li><a className="dropdown-item" href="/admin/scheduleManagement"><i className="bi bi-calendar2-week"> Quản lý lịch học</i></a></li>

                                    </ul>
                                </li>) : null}

                            </ul>
                            <hr className="navbar-divider my-5 opacity-20" />
                            <ul className="navbar-nav mb-md-4">
                                <li>
                                    <a className="nav-link text-xs font-semibold text-uppercase text-muted ls-wide" href="/chat">
                                        Tin nhắn
                                        <span
                                            className="badge bg-soft-primary text-primary rounded-pill d-inline-flex align-items-center ms-4">3</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link d-flex align-items-center">
                                        <div className="me-4">
                                            <div className="position-relative d-inline-block text-white">
                                                <img alt="Image Placeholder"
                                                    src="https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                                                    className="avatar rounded-circle" />
                                                <span
                                                    className="position-absolute bottom-2 end-2 transform translate-x-1/2 translate-y-1/2 border-2 border-solid border-current w-3 h-3 bg-success rounded-circle"></span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="d-block text-sm font-semibold">
                                                Daisy johnson
                                            </span>
                                            <span className="d-block text-xs text-muted font-regular">
                                                Paris, FR
                                            </span>
                                        </div>
                                        <div className="ms-auto">
                                            <i className="bi bi-chat"></i>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link d-flex align-items-center">
                                        <div className="me-4">
                                            <div className="position-relative d-inline-block text-white">
                                                <span className="avatar bg-soft-warning text-warning rounded-circle">JW</span>
                                                <span
                                                    className="position-absolute bottom-2 end-2 transform translate-x-1/2 translate-y-1/2 border-2 border-solid border-current w-3 h-3 bg-success rounded-circle"></span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="d-block text-sm font-semibold">
                                                Michael Jordan
                                            </span>
                                            <span className="d-block text-xs text-muted font-regular">
                                                Bucharest, RO
                                            </span>
                                        </div>
                                        <div className="ms-auto">
                                            <i className="bi bi-chat"></i>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link d-flex align-items-center">
                                        <div className="me-4">
                                            <div className="position-relative d-inline-block text-white">
                                                <img alt="..."
                                                    src="https://images.unsplash.com/photo-1610899922902-c471ae684eff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                                                    className="avatar rounded-circle" />
                                                <span
                                                    className="position-absolute bottom-2 end-2 transform translate-x-1/2 translate-y-1/2 border-2 border-solid border-current w-3 h-3 bg-danger rounded-circle"></span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="d-block text-sm font-semibold">
                                                Heather Wright
                                            </span>
                                            <span className="d-block text-xs text-muted font-regular">
                                                London, UK
                                            </span>
                                        </div>
                                        <div className="ms-auto">
                                            <i className="bi bi-chat"></i>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                            <div className="mt-auto"></div>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <button className="nav-link" onClick={handleLogout}>
                                        <i className="bi bi-box-arrow-left"></i> Đăng xuất

                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div >

                ) : (<div>Loading...</div>)
            }


        </nav >

    );
}
export default React.memo(NavBar);
