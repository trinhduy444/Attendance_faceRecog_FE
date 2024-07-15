import React, { useEffect, useState } from "react"
import NavBar from "../../components/NavBar"
import NavBarToggle from "../../components/NavBarToggle"
import Header from "../../components/Header"
import ClassRoomDetailContent from "./ClassRoomDetailContent"
export const ClassRoomDetail = () => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);

    useEffect(() => {
        document.title = "Phòng học"
    }, [])
    const toggleNavBar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    };
    // console.log("render notifi");
    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full">
            <NavBar isNavBarVisible={isNavBarVisible} />
            <div className="h-screen flex-grow-1 overflow-y-lg-auto">
                <Header />
                <NavBarToggle toggleNavBar={toggleNavBar} />
                <ClassRoomDetailContent />
            </div>
        </div>
    )
}