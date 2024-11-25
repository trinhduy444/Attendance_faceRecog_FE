import React, { useEffect, useState } from "react"
import NavBar from "../../components/NavBar"
import Header from "../../components/Header"
import AttendanceContent from "./AttendanceContent"
import { useSelector } from 'react-redux';
import AttendanceContentTeacher from "./AttendanceContentTeacher"

export const Attendance = () => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        document.title = "Dữ liệu điểm danh"
    }, [])
    const toggleNavBar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    };
    // console.log("render attend");
    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
            <NavBar isNavBarVisible={isNavBarVisible} />
            <div className="h-screen flex-grow-1">
                <Header toggleNavBar={toggleNavBar} />
                {user.role_id === 3 ? (
                    <AttendanceContent userId={user.user_id} />
                ) : user.role_id === 2 ? (
                    <AttendanceContentTeacher userId={user.user_id} />
                ) : (
                    <h1>Không có quyền truy cập</h1>
                )}
            </div>
        </div>
    )
}