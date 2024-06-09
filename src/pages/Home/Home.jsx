import React, { useEffect } from "react"
import { NavBar } from "../../components/NavBar"
import "../../assets/css/home.css"
export const Home = () => {
    useEffect(() => {
        const scripts = [
            "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js",
            'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js',
            'https://code.jquery.com/jquery-3.6.0.min.js    ',
        ];

        scripts.forEach((src) => {
            const script = document.createElement('script');
            script.src = src;
            script.crossOrigin = 'anonymous';
            document.body.appendChild(script);
        });

        return () => {
            scripts.forEach((src) => {
                const script = document.querySelector(`script[src="${src}"]`);
                document.body.removeChild(script);
            });
        };
    }, []);
    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary" >
            <NavBar />
            {/* <!--Main content-- > */}
            <div className="h-screen flex-grow-1 overflow-y-lg-auto">
                {/* <!-- Header --> */}
                <header id='header' className="bg-surface-primary border-bottom pt-6">
                    <div className="container-fluid">
                        <div className="mb-npx">
                            <div className="row align-items-center">
                                <div className="col-sm-6 col-12 mb-4 mb-sm-0">
                                    <h1 className="h2 mb-0 ls-tight">
                                        <img src="sclogo.jpg" width="40" className="rounded-circle" /> SCHOOL'S NAME UNIVERSITY
                                    </h1>
                                </div>
                            </div>

                        </div>
                    </div>
                </header>
                {/* <!-- Main --> */}
                <main className="py-6 bg-surface-secondary">
                    <div className="container-fluid">
                        <div className="row ">
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
                                    <div className="carousel-item active">/
                                        <img src="slide1.jpg" className="img-fluid" alt="..." />
                                        <div className="carousel-caption d-none d-md-block">
                                            <h5>First slide label</h5>
                                            <p>Coppyright by SCHOOL'S NAME UNIVERSITY</p>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <img src="slide2.jpg" className="img-fluid w-100" alt="..." />
                                        <div className="carousel-caption d-none d-md-block">
                                            <h5>Second slide label</h5>
                                            <p>Some representative placeholder content for the second slide.</p>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <img src="slide3.jpg" className="img-fluid" alt="..." />
                                        <div className="carousel-caption d-none d-md-block">
                                            <h5>Third slide label</h5>
                                            <p>Some representative placeholder content for the third slide.</p>
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
                        <div className="row g-6 mb-6">
                            <div className="col-xl-3 col-sm-6 col-12" >
                                <div className="card shadow border-0">
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
                                        <div className="mt-2 mb-0 text-sm">
                                            <span className="badge badge-pill bg-soft-success text-success me-2">
                                                <i className="bi bi-arrow-up me-1"></i>80%
                                            </span>
                                            <span className="text-nowrap text-xs text-muted">Since last month</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 col-12">
                                <div className="card shadow border-0">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <span className="h3 font-bold mb-0">Thời khóa
                                                    biểu</span>
                                                <span className="h6 font-semibold text-muted text-sm d-block mb-2">Week 1</span>

                                            </div>
                                            <div className="col-auto">
                                                <div className="icon icon-shape bg-info text-white text-d rounded-circle">
                                                    <i className="bi bi-calendar2-week"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-2 mb-0 text-sm">
                                            <span className="badge badge-pill bg-soft-success text-success me-2">
                                                <i className="bi bi-arrow-up me-1"></i>37%
                                            </span>
                                            <span className="text-nowrap text-xs text-muted">Since last month</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-sm-6 col-12">
                                <div className="card shadow border-0">
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
                                        <div className="mt-2 mb-0 text-sm">
                                            <span className="badge badge-pill bg-soft-danger text-danger me-2">
                                                <i className="bi bi-arrow-down me-1"></i>-5%
                                            </span>
                                            <span className="text-nowrap text-xs text-muted">Since last month</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 col-12">
                                <div className="card shadow border-0">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <span className="h3 font-bold mb-0">Viết đơn</span>
                                                <span className="h6 font-semibold text-muted text-sm d-block mb-2">Work
                                                    load</span>

                                            </div>
                                            <div className="col-auto">
                                                <div className="icon icon-shape bg-warning text-white text-lg rounded-circle">
                                                    <i className="bi bi-pencil-square"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-2 mb-0 text-sm">
                                            <span className="badge badge-pill bg-soft-success text-success me-2">
                                                <i className="bi bi-arrow-up me-1"></i>10%
                                            </span>
                                            <span className="text-nowrap text-xs text-muted">Since last month</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row g-6 mb-6">
                            <div className="col-xl-3 col-sm-6 col-12">
                                <div className="card shadow border-0">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <span className="h3 font-bold mb-0">Điểm danh</span>
                                                <span className="h6 font-semibold text-muted text-sm d-block mb-2">3</span>
                                            </div>
                                            <div className="col-auto">
                                                <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                                                    <i className="bi bi-clipboard-data"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-2 mb-0 text-sm">
                                            <span className="badge badge-pill bg-soft-success text-success me-2">
                                                <i className="bi bi-arrow-up me-1"></i>37%
                                            </span>
                                            <span className="text-nowrap text-xs text-muted">Since last month</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 col-12">
                                <div className="card shadow border-0">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <span className="h3 font-bold mb-0">Phòng học</span>
                                                <span className="h6 font-semibold text-muted text-sm d-block mb-2">New
                                                    projects</span>
                                            </div>
                                            <div className="col-auto">
                                                <div className="icon icon-shape bg-primary text-white text-lg rounded-circle">
                                                    <i className="bi bi-people"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-2 mb-0 text-sm">
                                            <span className="badge badge-pill bg-soft-success text-success me-2">
                                                <i className="bi bi-arrow-up me-1"></i>80%
                                            </span>
                                            <span className="text-nowrap text-xs text-muted">Since last month</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 col-12">
                                <div className="card shadow border-0">
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
                                        <div className="mt-2 mb-0 text-sm">
                                            <span className="badge badge-pill bg-soft-danger text-danger me-2">
                                                <i className="bi bi-arrow-down me-1"></i>-5%
                                            </span>
                                            <span className="text-nowrap text-xs text-muted">Since last month</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 col-12">
                                <div className="card shadow border-0">
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
                                        <div className="mt-2 mb-0 text-sm">
                                            <span className="badge badge-pill bg-soft-success text-success me-2">
                                                <i className="bi bi-arrow-up me-1"></i>10%
                                            </span>
                                            <span className="text-nowrap text-xs text-muted">Since last month</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div >
    )
}