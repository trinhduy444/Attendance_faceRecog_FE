import React, { useEffect,useState } from "react"
import NavBar from "../../../components/NavBar"
import UserManagementContent from "./UserManagementContent"
export const UserManagement = () => {
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
            <UserManagementContent toggleNavBar={toggleNavBar} />
        </div>
    )
}