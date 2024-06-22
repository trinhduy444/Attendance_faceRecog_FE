import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import {isAuthenticated} from './utils/checkAuthentication';
//Pages
import { Login } from './pages/Authentication/Login';
import { Home } from './pages/Home/Home';
import { Notification } from './pages/Notification/Notification';
import { Attendance } from './pages/Attendance/Attendance';
import { AttendanceDetail } from './pages/Attendance/AttendanceDetail';
import { EditProfile } from './pages/Profile/EditProfile';
import { ChangePassword } from './pages/Profile/ChangePassword';
import 'bootstrap/dist/js/bootstrap.min.js';


const ProtectedRoute = ({ element, ...rest }) => {
  const isLogged = isAuthenticated();
  return isLogged ? element : <Navigate to="/login" />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notification" element={<ProtectedRoute element={<Notification />} />} />
        <Route path="/attendance" element={<ProtectedRoute element={<Attendance />} />} />
        <Route path="/attendanceDetail" element={<ProtectedRoute element={<AttendanceDetail />} />} />
        <Route path="/editProfile" element={<ProtectedRoute element={<EditProfile />} />} />
        <Route path="/changePassword" element={<ProtectedRoute element={<ChangePassword />} />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
