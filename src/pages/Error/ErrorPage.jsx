import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../assets/css/errorpage.css'

const ErrorPage = () => {
    const location = useLocation();
    const { status, message } = location.state || { status: 404, message: "Không tìm thấy nội dung hoặc bạn không thể truy cập nội dung này" };
    return (
        <div className="container">
            <div className="error-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 ">
                            <div className="error-text">
                                <h3 className="error">{status} Error!</h3>
                                <div className="im-sheep">
                                    <div className="top">
                                        <div className="body"></div>
                                        <div className="head">
                                            <div className="im-eye one"></div>
                                            <div className="im-eye two"></div>
                                            <div className="im-ear one"></div>
                                            <div className="im-ear two"></div>
                                            <div className="im-mouth"></div>
                                        </div>
                                    </div>
                                    <div className="im-legs">
                                        <div className="im-leg"></div>
                                        <div className="im-leg"></div>
                                        <div className="im-leg"></div>
                                        <div className="im-leg"></div>
                                    </div>
                                </div>
                                <h4>KHÔNG TÌM THẤY NỘI DUNG!</h4>
                                <p>{message}</p>
                                <a className="btn btn-primary btn-round" href="/">Trở về trang chủ</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
