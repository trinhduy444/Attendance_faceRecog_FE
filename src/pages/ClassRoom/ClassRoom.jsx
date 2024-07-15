import React, { useEffect, useState } from "react"
import NavBar from "../../components/NavBar"
import NavBarToggle from "../../components/NavBarToggle"
import Header from "../../components/Header"
import ClassRoomContent from "./ClassRoomContent"
import "../../assets/css/classroom.css"
export const ClassRoom = () => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);
    useEffect(() => {
        document.title = "Phòng học"
    }, [])
    const toggleNavBar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    };
    // console.log("render classroom");
    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
            <NavBar isNavBarVisible={isNavBarVisible} />
            <div className="h-screen flex-grow-1">
                <Header />
                <NavBarToggle toggleNavBar={toggleNavBar} />
                <ClassRoomContent />
            </div>
        </div>
    )
}