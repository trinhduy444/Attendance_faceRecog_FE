import React, { useEffect,useState } from "react"
import NavBar from "../../../components/NavBar"
import CourseManagementContent from "./CourseManagementContent"
export const CourseManagement = () => {
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
            <CourseManagementContent toggleNavBar={toggleNavBar}/>
        </div>
    )
}