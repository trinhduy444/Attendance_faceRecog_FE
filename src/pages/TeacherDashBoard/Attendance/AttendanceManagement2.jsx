import React, { useEffect, useState } from "react"
import NavBar from "../../../components/NavBar"
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import NavBarToggle from "../../../components/NavBarToggle";
import { courseService } from '../../../services/courseService';
import { decodeId } from "../../../utils/secureEncoding";
import AttendanceManagementContent2 from "./AttendanceManagementContent2"

export const AttendanceManagement2 = () => {
    const navigate = useNavigate();
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);
    const { course_group_id } = useParams()

    useEffect(() => {
        const decode_course_group_id = decodeURIComponent(decodeId(course_group_id))
        checkAccessLinkRecog(decode_course_group_id)
        document.title = "Quản lý dữ liệu điểm danh"
    }, [])
    const checkAccessLinkRecog = async (courseGroupId) => {
        const response = await courseService.checkTeacherAccessCourseGroup(courseGroupId)
        if (response.status !== 200) {
            navigate('/error')
        }

    }
    const toggleNavBar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    };
    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
            <NavBar isNavBarVisible={isNavBarVisible} />
            <div className="h-screen flex-grow-1">

                <header className="bg-surface-primary border-bottom pt-1">
                    <div className="container">
                        <div className="mb-npx">
                            <div className="row align-items-center">
                                <div className="col-sm-6 col-12 mb-4 mb-sm-0">
                                    <h1 className="h2 mb-0 ls-tight">
                                        <NavBarToggle toggleNavBar={toggleNavBar} /> Quản lý dữ liệu điểm danh
                                    </h1>
                                </div>
                            </div>
                            <ul className="nav nav-tabs overflow-x border-0">
                                <li className="nav-item">
                                    <a href="/" className='nav-link font-regular'>
                                        <i className="bi bi-house"></i>  Trang chủ
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/attendance" className='nav-link font-regular'>
                                        <i className="bi bi-clipboard-data"></i>  Dữ liệu điểm danh
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/#" className='nav-link font-regular active'>
                                        <i className="bi bi-info"></i>   Quản lý dữ liệu điểm danh
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>
                <AttendanceManagementContent2  course_group_id={decodeURIComponent(decodeId(course_group_id))} />

            </div>
        </div>
    )
}