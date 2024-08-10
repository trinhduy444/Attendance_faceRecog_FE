import React, { useEffect, useState } from "react"
import NavBar from "../../components/NavBar"
import Header from "../../components/Header"
import AttendanceContent from "./AttendanceContent"
export const Attendance = () => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);

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
                <Header toggleNavBar={toggleNavBar}/>
                <AttendanceContent />
            </div>
        </div>
    )
}