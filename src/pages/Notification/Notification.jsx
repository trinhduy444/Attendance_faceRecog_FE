import React, { useEffect, useState } from "react"
import NavBar from "../../components/NavBar"
import NavBarToggle from "../../components/NavBarToggle"
import Header from "../../components/Header"
import NotificationContent from "./NotificationContent"
import "../../assets/css/notification.css"
export const Notification = () => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);

    useEffect(() => {
        document.title = "Thông báo"
    }, [])

    const toggleNavBar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    };

    console.log("render notifi");
    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
            <NavBar isNavBarVisible={isNavBarVisible} />
            <div className="h-screen flex-grow-1">
                <Header />
                <NavBarToggle toggleNavBar={toggleNavBar} />
                <NotificationContent />
            </div>

        </div>
    )
}