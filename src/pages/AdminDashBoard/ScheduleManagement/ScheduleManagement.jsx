import React, { useEffect,useState } from "react"
import NavBar from "../../../components/NavBar"
import ClassManagementContent from "./ScheduleManagementContent"
export const ScheduleManagement = () => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);
    useEffect(() => {
        document.title = "Quản lý lịch học"
    }, [])
    const toggleNavBar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    };

    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
            <NavBar isNavBarVisible={isNavBarVisible} />
            <ClassManagementContent  toggleNavBar={toggleNavBar}/>
        </div>
    )
}