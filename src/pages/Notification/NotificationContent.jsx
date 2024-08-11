import React, { useEffect, useState } from "react"
import { notifyService } from '../../services/notifyService';
import { convertDay } from '../../utils/convertDay'
import { displayContent } from '../../utils/displayContent'
import Swal from "sweetalert2"
import FilterNotification from './FilterNotification'
import Pagination from "../AdminDashBoard/UserManagement/Pagination"

function NotificationContent({ notifications }) {
    const [notificationDetail, setNotificationDetail] = useState()
    const [savedNotifications, setSavedNotifications] = useState([]);

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const notificationsPerPage = 3;
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('notificationSaved')) || [];
        setSavedNotifications(saved);
    }, [])

    // Handle Pagination
    const totalPages = Math.ceil(notifications.length / notificationsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    // Set View Notifications
    const viewedNotifications = async (notify_id, status) => {
        if (status === true) return
        else {
            await notifyService.viewNotification(notify_id)
            return
        }
    }
    // Show detail
    const showModalDetails = (notification) => {
        viewedNotifications(notification.notify_id, notification.nu_status)
        setNotificationDetail(notification)
    }
    // Save and unsave noti
    const saveNotification = (notify_id) => {
        const updatedSavedNotifications = [...savedNotifications, notify_id];
        setSavedNotifications(updatedSavedNotifications);
        localStorage.setItem('notificationSaved', JSON.stringify(updatedSavedNotifications));
    };

    const unsaveNotification = (notify_id) => {
        const updatedSavedNotifications = savedNotifications.filter(id => id !== notify_id);
        setSavedNotifications(updatedSavedNotifications);
        localStorage.setItem('notificationSaved', JSON.stringify(updatedSavedNotifications));
    };

    // Check save
    const isNotificationSaved = (notify_id) => {
        return savedNotifications.includes(notify_id);
    };
    // pagination part 2
    const indexOfLastNotification = currentPage * notificationsPerPage;
    const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
    const currentNotifications = notifications.slice(indexOfFirstNotification, indexOfLastNotification);

    return (

        <div className="row">
            <div className="col-3 mt-2 d-flex justify-content-center">
                <h5> Trang {currentPage} trong <b className="text-danger">{totalPages}</b> trang </h5>
            </div>
            <div className="col-9">
                {/* <nav aria-label="page-notification">
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <a className="page-link" type="button" aria-label="Previous" onClick={() => handlePageChange(currentPage - 1)}>
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        {[...Array(totalPages)].map((_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <a className="page-link" type="button" onClick={() => handlePageChange(index + 1)}>{index + 1}</a>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <a className="page-link" type="button" aria-label="Next" onClick={() => handlePageChange(currentPage + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav> */}
                <Pagination
                    totalItems={notifications.length}
                    itemsPerPage={notificationsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
            <div className="div-notifications">
                {currentNotifications.map((notification, index) => (
                    <div className="row mb-1" key={index}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-primary">
                                    {isNotificationSaved(notification.notify_id) ? (
                                        <p
                                            className="badge badge-pill bg-soft-success text-success me-2">
                                            Đã lưu
                                        </p>

                                    ) : (
                                        null
                                    )}
                                    {notification.nu_status ? (null) : (<p
                                        className="badge badge-pill bg-soft-danger text-danger me-2">
                                        Chưa xem
                                    </p>)}
                                    {notification.title}
                                </h5>
                                <h6 className="card-subtitle mb-2 text-muted">
                                    {notification.nickname} | Ngày đăng: {convertDay(notification.create_time)}
                                </h6>
                                <div className="d-flex justify-content-between">
                                    <a className="card-link" type="button" data-bs-toggle="modal" data-bs-target="#detailNotificationModal" onClick={() => showModalDetails(notification)}>
                                        Xem chi tiết
                                    </a>
                                    {isNotificationSaved(notification.notify_id) ? (
                                        <button type="button" className="btn btn-danger" onClick={() => unsaveNotification(notification.notify_id)}>Hủy lưu thông báo</button>
                                    ) : (
                                        <button type="button" className="btn btn-outline-success" onClick={() => saveNotification(notification.notify_id)}>Lưu thông báo</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="detailNotificationModal" tabIndex="-1"
                aria-labelledby="detailNotificationModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="detailNotificationModalLabel">Chi tiết thông báo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h2 className="d-flex justify-content-center text-primary">
                                {notificationDetail?.title}
                            </h2>
                            <p className="d-flex justify-content-center">
                                {notificationDetail?.nickname} | Ngày đăng: {convertDay(notificationDetail?.create_time)}
                            </p>
                            <span className="d-flex justify-content-start">
                                {displayContent({ content: notificationDetail?.content })}
                            </span>
                            {notificationDetail?.file_link ? (
                                <><p className="mt-2 fw-bold">Đường dẫn đính kèm:</p><a href={notificationDetail?.file_link} target="_blank" rel="noopener noreferrer">{notificationDetail?.file_link}</a></>) : (null)}

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            {/* <!-- <button type="button" className="btn btn-primary">Save changes</button> --> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>



    );
}
export default React.memo(NotificationContent);
