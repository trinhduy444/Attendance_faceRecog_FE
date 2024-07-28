import React, { useEffect, useState } from "react"
import NavBar from "../../components/NavBar"
import NavBarToggle from "../../components/NavBarToggle"
import { useSelector } from 'react-redux';
import Header from "../../components/Header"
import CourseGroupDetailContent from "./CourseGroupDetailContent"
import {  useParams } from "react-router-dom";

export const CourseGroupDetail = () => {

    const {course_group} = useParams()

    const [isNavBarVisible, setIsNavBarVisible] = useState(false);
    const user = useSelector(state => state.auth.user);
    const [role, setRole] = useState(null);
    useEffect(() => {
        document.title = "Nhóm học"
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
    // console.log("render notifi");
    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full">
            <NavBar isNavBarVisible={isNavBarVisible} />
            <div className="h-screen flex-grow-1 overflow-y-lg-auto">
                <Header />
                <NavBarToggle toggleNavBar={toggleNavBar} />
                <CourseGroupDetailContent role={role} course_group={course_group} />
            </div>
        </div>
    )
}