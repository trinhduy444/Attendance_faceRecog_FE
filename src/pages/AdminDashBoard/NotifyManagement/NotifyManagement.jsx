import React, { useEffect,useState } from "react"
import NavBar from "../../../components/NavBar"
import NotifyManagementContent from "./NotifyManagementContent"
export const NotifyManagement = () => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);
    useEffect(() => {
        document.title = "Quản lý thông báo"
    }, [])
    const toggleNavBar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    };

    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
            <NavBar isNavBarVisible={isNavBarVisible} />
            <NotifyManagementContent toggleNavBar={toggleNavBar}/>
        </div>
    )
}