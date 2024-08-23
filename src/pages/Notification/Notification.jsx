import React, { useEffect, useState } from "react"
import NavBar from "../../components/NavBar"
import Swal from "sweetalert2"
import Header from "../../components/Header"
import NotificationContent from "./NotificationContent"
import FilterNotification from "./FilterNotification"
import { notifyService } from "../../services/notifyService"
import "../../assets/css/notification.css"
export const Notification = () => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);
    const [notifications, setNotifications] = useState([])
    const [filteredNotifications, setFilteredNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications()
        document.title = "Thông báo"
    }, [])

    const toggleNavBar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    };
    const fetchNotifications = async () => {
        const response = await notifyService.getAllNotificationsActiveByUser();
        if (response.status === 200) {
            setNotifications(response.data.metadata)
            setFilteredNotifications(response.data.metadata)
        } else {
            Swal.fire("Lỗi!", "Không thể lấy dữ liệu các thông báo!", 'error')
            return;
        }
    }
    const handleFilter = (filteredData) => {
        setFilteredNotifications(filteredData);
    };

    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
            <NavBar isNavBarVisible={isNavBarVisible} />
            <div className="h-screen flex-grow-1">
                <Header toggleNavBar={toggleNavBar} />
                <main className="py-6 bg-surface-secondary">
                    <div className="container">
                        <FilterNotification notifications={notifications} onFilter={handleFilter} />
                        <NotificationContent notifications={filteredNotifications.length > 0 ? filteredNotifications : notifications} />
                    </div>

                </main>
            </div>

        </div>
    )
}