import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import slide1 from "../../assets/images/slide1.jpg"
import slide2 from "../../assets/images/slide2.jpg"
import slide3 from "../../assets/images/slide3.jpg"
function HomeContent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const accessToken = params.get('accessToken');
        const status = params.get('status');
        const message = params.get('message');
        const user = JSON.parse(params.get('metadata'));
        const refreshToken = params.get('refreshToken');

        if (accessToken && status ==='200') {
            localStorage.setItem('accessToken', accessToken);
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    user: user,
                    refreshToken: refreshToken,
                }
            });
            Swal.fire({
                icon: 'success',
                title: message,
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/');
        }
        if (!localStorage.getItem('accessToken')) {
            navigate('/login');
        }
    }, [location.search]);
    const handleCardClick = (page) => {
        if (page) {
            navigate("/" + page);
        }
    };

    // console.log("Render Home Content")
    return (
        <main className="bg-surface-secondary p-2">
                <div className="row mt-1">
                    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0"
                                className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                                aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                                aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={slide1} className="img-fluid" alt="..." />
                                <div className="carousel-caption d-none d-md-block">
                                    <p>Coppyright by TON DUC THANG UNIVERSITY</p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src={slide2} className="img-fluid w-100" alt="..." />
                                <div className="carousel-caption d-none d-md-block">
                                    <p>Coppyright by TON DUC THANG UNIVERSITY</p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src={slide3} className="img-fluid" alt="..." />
                                <div className="carousel-caption d-none d-md-block">
                                    <p>Coppyright by TON DUC THANG UNIVERSITY</p>
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button"
                            data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button"
                            data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className="card-container">
                    <div className="row g-6 mb-6">
                        <div className="col-xl-3 col-sm-6 col-12" >
                            <div className="card shadow border-0" onClick={() => handleCardClick('notification')} style={{ cursor: 'pointer' }}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <span className="h3 font-bold mb-0">Thông
                                                báo</span>
                                            <span className="h6 font-semibold text-muted text-sm d-block mb-2">99+</span>

                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape bg-primary text-white text-lg rounded-circle">
                                                <i className="bi bi-bell"></i>
                                            </div>
                                        </div>
                                    </div>
                    
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 col-12">
                            <div className="card shadow border-0" onClick={() => handleCardClick('schedule')} style={{ cursor: 'pointer' }}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <span className="h3 font-bold mb-0">Thời khóa
                                                biểu</span>
                                            <span className="h6 font-semibold text-muted text-sm d-block mb-2">Tuần 43</span>

                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape bg-info text-white text-d rounded-circle">
                                                <i className="bi bi-calendar2-week"></i>
                                            </div>
                                        </div>
                                    </div>
                      
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-sm-6 col-12">
                            <div className="card shadow border-0" onClick={() => handleCardClick('news')} style={{ cursor: 'pointer' }}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <span className="h3 font-bold mb-0">Tin tức</span>
                                            <span className="h6 font-semibold text-muted text-sm d-block mb-2">99+</span>
                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape bg-success text-white text-lg rounded-circle">
                                                <i className="bi bi-newspaper"></i>
                                            </div>
                                        </div>
                                    </div>
                 
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 col-12">
                            <div className="card shadow border-0" onClick={() => handleCardClick('request')} style={{ cursor: 'pointer' }}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <span className="h3 font-bold mb-0">Viết đơn</span>
                                            <span className="h6 font-semibold text-muted text-sm d-block mb-2">Quản lý đơn cá nhân</span>

                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape bg-warning text-white text-lg rounded-circle">
                                                <i className="bi bi-pencil-square"></i>
                                            </div>
                                        </div>
                                    </div>
                               
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-6 mb-6">
                        <div className="col-xl-3 col-sm-6 col-12">
                            <div className="card shadow border-0" onClick={() => handleCardClick('attendance')} style={{ cursor: 'pointer' }}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <span className="h3 font-bold mb-0">Điểm danh</span>
                                            <span className="h6 font-semibold text-muted text-sm d-block mb-2">Dữ liệu điểm danh</span>
                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                                                <i className="bi bi-clipboard-data"></i>
                                            </div>
                                        </div>
                                    </div>
       
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 col-12">
                            <div className="card shadow border-0" onClick={() => handleCardClick('coursegroup')} style={{ cursor: 'pointer' }}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <span className="h3 font-bold mb-0">Nhóm học</span>
                                            <span className="h6 font-semibold text-muted text-sm d-block mb-2">Nhóm học của bạn</span>
                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape bg-primary text-white text-lg rounded-circle">
                                                <i className="bi bi-people"></i>
                                            </div>
                                        </div>
                                    </div>
                
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 col-12">
                            <div className="card shadow border-0" onClick={() => handleCardClick('teacherInfo')} style={{ cursor: 'pointer' }}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <span className="h3 font-bold mb-0">Giảng viên</span>
                                            <span className="h6 font-semibold text-muted text-sm d-block mb-2">Danh sách
                                                giàng viên</span>

                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape bg-info text-white text-lg rounded-circle">
                                                <i className="bi bi-clock-history"></i>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 col-12">
                            <div className="card shadow border-0" onClick={() => handleCardClick('')} style={{ cursor: 'pointer' }}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <span className="h3 font-bold mb-0">Hỗ trợ</span>

                                            <span className="h6 font-semibold text-muted text-sm d-block mb-2">Work
                                                load</span>
                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape bg-danger text-white text-lg rounded-circle">
                                                <i className="bi bi-minecart-loaded"></i>
                                            </div>
                                        </div>
                                    </div>
   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </main>
    );
}

export default React.memo(HomeContent);
