import React, { useEffect,useState } from "react"
import NavBar from "../../../components/NavBar"
import ManagerManagementContent from "./ManagerManagementContent"
export const ManagerManagement = () => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);
    useEffect(() => {
        document.title = "Quản lý quản trị"
    }, [])
    const toggleNavBar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    };

    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
            <NavBar isNavBarVisible={isNavBarVisible} />
            <ManagerManagementContent toggleNavBar={toggleNavBar} />
        </div>
    )
}