import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../assets/css/login.css";
import { authService } from '../../services/authService';
import Swal from 'sweetalert2';

export const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(userName, password);
      const response = await authService.login(userName, password);
      if (response.status === 200) {
        localStorage.setItem('accessToken', response.data.token);
        Swal.fire({
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/');
      }else{
        Swal.fire({
          icon: 'error',
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (err) {
      console.error(err);
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
          <a href="/haha" className="fw-light" id="loginAdmin">Đăng nhập admin --  </a>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label for="username">Tên đăng nhập:</label>
              <input type="text" className="form-control" onChange={(e) => setUserName(e.target.value)} id="username" aria-describedby="textStudentID" placeholder="Nhập Student ID..." />
            </div>
            <div className="form-group">
              <label for="password">Mật khẩu:</label>
              <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} id="password" aria-describedby="passWord" placeholder="Nhập mật khẩu..." />
            </div>
            <div className="form-group">
              <a href="/hehe" className="fw-light">Quên mật khẩu?</a>
              <button type="submit" id="loginSubmit" className="btn btn-primary">Đăng nhập</button>
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