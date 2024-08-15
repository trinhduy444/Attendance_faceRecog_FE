import React, { useEffect, useState } from "react"
import NavBar from "../../components/NavBar"
import Header from "../../components/Header"
import { useSelector } from 'react-redux';
import AttendanceDetailContent from "./AttendanceDetailContent"
import { useParams } from "react-router-dom";
import { decodeId } from "../../utils/secureEncoding";
import NavBarToggle from "../../components/NavBarToggle";

export const AttendanceDetail = () => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);
    const user = useSelector(state => state.auth.user);
    const { course_group_id, ban_yn } = useParams()


    useEffect(() => {
        document.title = "Dữ liệu điểm danh"
    }, [])
    const toggleNavBar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    };
    // console.log("render notifi");
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
                                        <NavBarToggle toggleNavBar={toggleNavBar} /> Chi tiết điểm danh
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
                                    <a href="/attendance" className='nav-link font-regular active'>
                                        <i className="bi bi-info"></i>  Chi tiết điểm danh
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>
                {/* <!-- Main --> */}
                <AttendanceDetailContent userId={user.user_id} courseGroupId={decodeURIComponent(decodeId(course_group_id))} ban_yn={decodeURIComponent(ban_yn)} />
            </div>
        </div>
    )
}