import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Error page
import MyErrorBoundary from './pages/Error/ErrorFallback';
import ErrorPage from './pages/Error/ErrorPage';
//Redux
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
// import {thunk} from 'redux-thunk';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import rootReducer from './reducer/rootReducer';
import ProtectedRoute from './utils/checkAuthentication';
//Pages
import { Login } from './pages/Authentication/Login';
import { Home } from './pages/Home/Home';
import { Notification } from './pages/Notification/Notification';
import { Attendance } from './pages/Attendance/Attendance';
import { AttendanceDetail } from './pages/Attendance/AttendanceDetail';
import { FaceRecognition } from './pages/Attendance/FaceRecognition';
import { EditProfile } from './pages/Profile/EditProfile';
import { ChangePassword } from './pages/Profile/ChangePassword';
import { Schedule } from './pages/Schedule/Schedule';
import { CourseGroup } from './pages/CourseGroup/CourseGroup';
import { CourseGroupDetail } from './pages/CourseGroup/CourseGroupDetail';
//Admin Pages
import { UserManagement } from './pages/AdminDashBoard/UserManagement/UserManagement';
import { ClassRoomManagement } from './pages/AdminDashBoard/ClassRoomManagement/ClassRoomManagement';
import { ScheduleManagement } from './pages/AdminDashBoard/ScheduleManagement/ScheduleManagement';
import { TeacherManagement } from './pages/AdminDashBoard/TeacherManagement/TeacherManagement'
import { CourseManagement } from './pages/AdminDashBoard/CourseManagement/CourseManagement';
import { NotifyManagement } from './pages/AdminDashBoard/NotifyManagement/NotifyManagement';
import { CreateNotify } from './pages/AdminDashBoard/NotifyManagement/CreateNotify'
import 'bootstrap/dist/js/bootstrap.min.js';
import 'react-quill/dist/quill.snow.css';

// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
 
const store = createStore(persistedReducer);
const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* <React.StrictMode> */}
      <Router>
        <MyErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/notification" element={<ProtectedRoute element={<Notification />} />} />
            <Route path="/attendance" element={<ProtectedRoute element={<Attendance />} />} />
            <Route path="/attendance/detail" element={<ProtectedRoute element={<AttendanceDetail />} />} />
            <Route path="/attendance/scan" element={<ProtectedRoute element={<FaceRecognition />} />} />
            <Route path="/editProfile" element={<ProtectedRoute element={<EditProfile />} />} />
            <Route path="/changePassword" element={<ProtectedRoute element={<ChangePassword />} />} />
            <Route path="/schedule" element={<ProtectedRoute element={<Schedule />} />} />
            <Route path="/coursegroup" element={<ProtectedRoute element={<CourseGroup />} />} />
            <Route path="/coursegroup/detail/:course_group" element={<ProtectedRoute element={<CourseGroupDetail />} />} />
            <Route path="/createNotify" element={<ProtectedRoute type={4} element={<CreateNotify />} />} />

            <Route path="/admin/userManagement" element={<ProtectedRoute  type={1} element={<UserManagement />} />} />
            <Route path="/admin/teacherManagement" element={<ProtectedRoute type={1} element={<TeacherManagement />} />} />
            <Route path="/admin/classRoomManagement" element={<ProtectedRoute type={1} element={<ClassRoomManagement />} />} />
            <Route path="/admin/scheduleManagement" element={<ProtectedRoute type={1} element={<ScheduleManagement />} />} />
            <Route path="/admin/courseManagement" element={<ProtectedRoute type={1} element={<CourseManagement />} />} />
            <Route path="/admin/notifyManagement" element={<ProtectedRoute type={1} element={<NotifyManagement />} />} />

            <Route path="/error" element={<ErrorPage />} />
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
          </Routes>
        </MyErrorBoundary>
      </Router>
      {/* </React.StrictMode> */}
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
