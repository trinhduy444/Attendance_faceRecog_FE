import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import NavBar from "../../components/NavBar"
import NavBarToggle from "../../components/NavBarToggle"
import { useSelector } from 'react-redux';
import CourseGroupDetailContent from "./CourseGroupDetailContent"
import { useParams } from "react-router-dom";
import { decodeId } from "../../utils/secureEncoding";
import { courseService } from "../../services/courseService";
import sclogo from "../../assets/images/sclogo.jpg"
export const CourseGroupDetail = () => {
    const navigate = useNavigate(); 
    const { course_group } = useParams()
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);
    const user = useSelector(state => state.auth.user);
    const [role, setRole] = useState(user.role_id);
    useEffect(() => {
        document.title = "Chi tiết nhóm học"
        handleCheckAccess();
    }, [])

    const handleCheckAccess = async () => {
        if (role === 3) {
            const course_group_id = decodeURIComponent(decodeId(course_group));
            try {
                const res = await courseService.checkAccessCourseGroup(course_group_id);
                if (res.status === 400) {
                    navigate('/error');
                }
            } catch (error) {
                console.error('Error checking access:', error);
                navigate('/error');
            }
        }
    }
    const toggleNavBar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    };
    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full">
            <NavBar isNavBarVisible={isNavBarVisible} />
            <div className="h-screen flex-grow-1 overflow-y-lg-auto">
                <header className="bg-surface-primary border-bottom pt-3">
                    <div className="container">
                        <div className="mb-npx">
                            <div className="row align-items-center">
                                <div className="col-sm-6 col-12 mb-4 mb-sm-0">
                                    <h1 className="h2 mb-0 ls-tight">
                                    <NavBarToggle toggleNavBar={toggleNavBar} />Chi tiết nhóm học
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
                                    <a href='/coursegroup' className='nav-link font-regular'>
                                        <i className='bi bi-people'></i> Nhóm học
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href='#' className='nav-link font-regular active'>
                                        <i className='bi bi-info'></i> Chi tiết nhóm học
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>
                
                <CourseGroupDetailContent role={role} course_group={decodeURIComponent(decodeId(course_group))} />
            </div>
        </div>
    )
}