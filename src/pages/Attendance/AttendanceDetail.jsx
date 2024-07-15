import React, { useEffect, useState } from "react"
import NavBar from "../../components/NavBar"
import NavBarToggle from "../../components/NavBarToggle"
import Header from "../../components/Header"
import AttendanceDetailContent from "./AttendanceDetailContent"
export const AttendanceDetail = () => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);
    useEffect(() => {
        document.title = "Dữ liệu điểm danh"
    }, [])
    const toggleNavBar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    };
    // console.log("render notifi");
    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
            <NavBar isNavBarVisible={isNavBarVisible} />
            <div className="h-screen flex-grow-1">
                <Header/>
                {/* <!-- Main --> */}
                <NavBarToggle toggleNavBar={toggleNavBar} />
                <AttendanceDetailContent />
            </div>
        </div>
    )
}