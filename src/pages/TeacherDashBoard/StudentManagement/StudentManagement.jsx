import React, { useEffect, useState } from "react"
import NavBar from "../../../components/NavBar"
import Header from "../../../components/Header"
import StudentManagementContent from "./StudentManagementContent"
export const StudentManagement = () => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);
    useEffect(() => {
        document.title = "Quản lý sinh viên"
    }, [])
    const toggleNavBar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    };

    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
            <NavBar isNavBarVisible={isNavBarVisible} />
            <div className="h-screen flex-grow-1">
                <Header toggleNavBar={toggleNavBar} />
                <main className="py-6 bg-surface-secondary">
                        <StudentManagementContent />
\                </main>
            </div>
        </div>
    )
}