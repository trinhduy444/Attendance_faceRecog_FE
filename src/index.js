import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//Redux
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
// import {thunk} from 'redux-thunk';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import rootReducer from './reducer/rootReducer';
import { isAuthenticated } from './utils/checkAuthentication';
//Pages
import { Login } from './pages/Authentication/Login';
import { Home } from './pages/Home/Home';
import { Notification } from './pages/Notification/Notification';
import { Attendance } from './pages/Attendance/Attendance';
import { AttendanceDetail } from './pages/Attendance/AttendanceDetail';
import { EditProfile } from './pages/Profile/EditProfile';
import { ChangePassword } from './pages/Profile/ChangePassword';
import { Schedule } from './pages/Schedule/Schedule';
import { ClassRoom } from './pages/ClassRoom/ClassRoom';
import { ClassRoomDetail } from './pages/ClassRoom/ClassRoomDetail';
//Admin Pages
import { UserManagement } from './pages/AdminDashBoard/UserManagement/UserManagement';
import { ClassRoomManagement } from './pages/AdminDashBoard/ClassRoomManagement/ClassRoomManagement';
import { ScheduleManagement } from './pages/AdminDashBoard/ScheduleManagement/ScheduleManagement';
import { TeacherManagement } from './pages/AdminDashBoard/TeacherManagement/TeacherManagement'
import 'bootstrap/dist/js/bootstrap.min.js';


const ProtectedRoute = ({ element }) => {
  const isLogged = isAuthenticated();
  return isLogged ? element : <Navigate to="/login" />;
};

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
      <React.StrictMode>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/notification" element={<ProtectedRoute element={<Notification />} />} />
            <Route path="/attendance" element={<ProtectedRoute element={<Attendance />} />} />
            <Route path="/attendance/detail" element={<ProtectedRoute element={<AttendanceDetail />} />} />
            <Route path="/editProfile" element={<ProtectedRoute element={<EditProfile />} />} />
            <Route path="/changePassword" element={<ProtectedRoute element={<ChangePassword />} />} />
            <Route path="/schedule" element={<ProtectedRoute element={<Schedule />} />} />
            <Route path="/classroom" element={<ProtectedRoute element={<ClassRoom />} />} />
            <Route path="/classroom/detail" element={<ProtectedRoute element={<ClassRoomDetail />} />} />
            <Route path="/admin/userManagement" element={<ProtectedRoute element={<UserManagement />} />} />
            <Route path="/admin/teacherManagement" element={<ProtectedRoute element={<TeacherManagement />} />} />

            <Route path="/admin/classRoomManagement" element={<ProtectedRoute element={<ClassRoomManagement />} />} />
            <Route path="/admin/scheduleManagement" element={<ProtectedRoute element={<ScheduleManagement />} />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
