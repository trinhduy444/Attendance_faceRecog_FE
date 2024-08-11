import React, { useEffect,useState } from "react"
import NavBar from "../../../components/NavBar"
import CourseGroupManagementContent from "./CourseGroupManagementContent"
export const CourseGroupManagement = () => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);
    useEffect(() => {
        document.title = "Quản lý người dùng"
    }, [])
    const toggleNavBar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    };

    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
            <NavBar isNavBarVisible={isNavBarVisible} />
            <CourseGroupManagementContent toggleNavBar={toggleNavBar}/>
        </div>
    )
}