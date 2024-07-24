import React, { useEffect,useState } from "react"
import NavBar from "../../../components/NavBar"
import NavBarToggle from "../../../components/NavBarToggle"
import ClassManagementContent from "./ClassManagementContent"
export const ClassRoomManagement = () => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);
    useEffect(() => {
        document.title = "Quản lý phòng học"
    }, [])
    const toggleNavBar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    };

    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
            <NavBar isNavBarVisible={isNavBarVisible} />
            <NavBarToggle toggleNavBar={toggleNavBar} />
            <ClassManagementContent />
        </div>
    )
}