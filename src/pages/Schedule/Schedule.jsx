import React, { useEffect, useState } from "react"
import NavBar from "../../components/NavBar"
import Header from "../../components/Header"
import ScheduleContent from "./ScheduleContent"
import "../../assets/css/schedule.css"
export const Schedule = () => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);

    useEffect(() => {
        document.title = "Thời khóa biểu"
    }, [])
    const toggleNavBar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    };

    // console.log("render notifi");
    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
            <NavBar isNavBarVisible={isNavBarVisible} />
            <div className="h-screen flex-grow-1 ">
                <Header toggleNavBar={toggleNavBar} />
                <ScheduleContent />
            </div>
        </div>
    )
}