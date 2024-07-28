import React, { useEffect, useState } from "react"
import NavBar from "../../components/NavBar"
import NavBarToggle from "../../components/NavBarToggle"
import Header from "../../components/Header"
import CourseGroupContent from "./CourseGroupContent"
import { useSelector } from 'react-redux';

import "../../assets/css/coursegroup.css"
export const CourseGroup = () => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);
    const user = useSelector(state => state.auth.user);
    const [role, setRole] = useState(null);
    useEffect(() => {
        document.title = "Phòng học"
        if (user.role_id === 2) {
            setRole(2)
        }
        else {
            setRole(3)
        }
    }, [])
    const toggleNavBar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    };

    // console.log("render CourseGroup");
    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
            <NavBar isNavBarVisible={isNavBarVisible} />
            <div className="h-screen flex-grow-1">
                <Header />
                <NavBarToggle toggleNavBar={toggleNavBar} />
                <CourseGroupContent role={role} />
            </div>
        </div>
    )
}