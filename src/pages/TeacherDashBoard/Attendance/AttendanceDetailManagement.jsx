import React, { useEffect, useState } from "react"
import NavBar from "../../../components/NavBar"
import NavBarToggle from "../../../components/NavBarToggle"
import AttendanceDetailContent from "./AttendanceDetailContent"
import { useParams } from "react-router-dom"
import { decodeId } from "../../../utils/secureEncoding"
export const AttendanceDetailManagement = () => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);
    const { student_id, course_group_id } = useParams()
    useEffect(() => {
        document.title = "Chi tiết điểm danh"
    }, [])
    const toggleNavBar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    };

    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full">
            <NavBar isNavBarVisible={isNavBarVisible} />
            <div className="h-screen flex-grow-1">
                <header className="bg-surface-primary border-bottom pt-3">
                    <div className="container">
                        <div className="mb-npx">
                            <div className="row align-items-center">
                                <div className="col-sm-6 col-12 mb-4 mb-sm-0">
                                    <h1 className="h2 mb-0 ls-tight">
                                        <NavBarToggle toggleNavBar={toggleNavBar} />Chi tiết điểm danh
                                    </h1>
                                </div>
                            </div>
                            <ul className="nav nav-tabs overflow-x border-0">
                                <li className="nav-item">
                                    <a href='/' className='nav-link font-regular'>
                                        <i className='bi bi-house'></i> Trang chủ
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href='/attendanceData' className='nav-link font-regular'>
                                        <i className='bi bi-clipboard-data'></i> Quản lý dữ liệu điểm danh
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href='#' className='nav-link font-regular active'>
                                        <i className='bi bi-info'></i> Chi tiết dữ liệu
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>
                <AttendanceDetailContent student_id={decodeURIComponent(decodeId(student_id))} course_group_id={decodeURIComponent(decodeId(course_group_id))} />
            </div>
        </div>
    )
}