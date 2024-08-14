import React, { useEffect, useState } from "react"
import NavBar from "../../../components/NavBar"
import Header from "../../../components/Header"
import { useSelector } from 'react-redux';
import AttendanceAdjustmentContent from "./AttendanceAdjustmentContent"
export const AttendanceAdjustment = () => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        document.title = "Điều chỉnh dữ liệu điểm danh"
    }, [])
    const toggleNavBar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    };
    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
            <NavBar isNavBarVisible={isNavBarVisible} />
            <div className="h-screen flex-grow-1">
                <Header toggleNavBar={toggleNavBar}/>
                <AttendanceAdjustmentContent role={user.role_id} />
            </div>
        </div>
    )
}