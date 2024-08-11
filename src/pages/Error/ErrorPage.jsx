import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../assets/css/errorpage.css'

const ErrorPage = () => {
    const location = useLocation();
    const { status, message } = location.state || { status: 404, message: "Không tìm thấy nội dung hoặc bạn không thể truy cập nội dung này" };
    return (
        <div class="container">
            <div class="error-content">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 ">
                            <div class="error-text">
                                <h3 class="error">{status} Error!</h3>
                                <div class="im-sheep">
                                    <div class="top">
                                        <div class="body"></div>
                                        <div class="head">
                                            <div class="im-eye one"></div>
                                            <div class="im-eye two"></div>
                                            <div class="im-ear one"></div>
                                            <div class="im-ear two"></div>
                                            <div class="im-mouth"></div>
                                        </div>
                                    </div>
                                    <div class="im-legs">
                                        <div class="im-leg"></div>
                                        <div class="im-leg"></div>
                                        <div class="im-leg"></div>
                                        <div class="im-leg"></div>
                                    </div>
                                </div>
                                <h4>KHÔNG TÌM THẤY NỘI DUNG!</h4>
                                <p>{message}</p>
                                <a class="btn btn-primary btn-round" href="/">Trở về trang chủ</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
