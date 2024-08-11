import React, { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { notifyService } from "../../../services/notifyService";
import NavBarToggle from "../../../components/NavBarToggle";
import { convertDay } from '../../../utils/convertDay'
import { displayContent } from '../../../utils/displayContent'
import Pagination from '../UserManagement/Pagination'
function NotifyManagementContent({ toggleNavBar }) {
    const [notifications, setNotifications] = useState([])
    const [notificationDetail, setNotificationDetail] = useState()
    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const notificationsPerPage = 3;
    useEffect(() => {
        fetchNotifications()
    }, [])
    const fetchNotifications = async () => {
        const response = await notifyService.getAllNotifications();
        if (response.status === 200) {
            console.log(response.data.metadata)
            setNotifications(response.data.metadata)
        } else {
            Swal.fire("Lỗi!", "Không thể lấy dữ liệu các thông báo!", 'error')
            return;
        }
    }
    // Handle Pagination
    const totalPages = Math.ceil(notifications.length / notificationsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const indexOfLastNotification = currentPage * notificationsPerPage;
    const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
    const currentNotifications = notifications.slice(indexOfFirstNotification, indexOfLastNotification);

    const showModalDetails = (notification) => {
        setNotificationDetail(notification)
    }
    const hideNotifications = async (notify_id) => {
        const response = await notifyService.hideNotification(notify_id)
        if (response.status !== 201) {
            Swal.fire('Lỗi', 'Không thể ẩn thông báo!', 'error')
            return
        } else {
            Swal.fire('Thành công', 'Ẩn thông báo thành công!', 'success')
            fetchNotifications()
            return
        }
    }
    const showNotifications = async (notify_id) => {
        const response = await notifyService.showNotification(notify_id)
        if (response.status !== 201) {
            Swal.fire('Lỗi', 'Không thể hiển thị thông báo!', 'error')
            fetchNotifications()
            return
        } else {
            Swal.fire('Thành công', 'Hiển thị thông báo thành công!', 'success')
            fetchNotifications()
            return
        }
    }
    return (
        <div className="h-screen flex-grow-1 overflow-y-lg-auto">

            <header className="bg-surface-primary border-bottom pt-3 pb-3">
                <div className="container">
                    <div className="mb-npx">
                        <div className="row align-items-center">
                            <div className="col-sm-6 col-12 mb-4 mb-sm-0">

                                <h1 className="h2 mb-0 ls-tight">
                                    <NavBarToggle toggleNavBar={toggleNavBar} />
                                    QUẢN LÝ THÔNG BÁO</h1>
                            </div>
                            <div className="col-sm-6 col-12 text-sm-end">
                                <a href="/createNotify" target="_blank" rel="noopener noreferrer" className="btn d-inline-flex btn-sm btn-primary mx-1">
                                    <span className=" pe-2">
                                        <i className="bi bi-plus"></i>
                                    </span>
                                    <span>Tạo thông báo</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="py-6 bg-surface-secondary">
                <div className="container">
                    <div className="row">
                        <div className="col-3 mt-2 d-flex justify-content-center">
                            <h5> Trang {currentPage} trong {totalPages} trang </h5>
                        </div>
                        <div className="col-9">
                            {/* <nav aria-label="page-notification">
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <a className="page-link" href="#" aria-label="Previous" onClick={() => handlePageChange(currentPage - 1)}>
                                            <span aria-hidden="true">&laquo;</span>
                                        </a>
                                    </li>
                                    {[...Array(totalPages)].map((_, index) => (
                                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                            <a className="page-link" href="#" onClick={() => handlePageChange(index + 1)}>{index + 1}</a>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <a className="page-link" href="#" aria-label="Next" onClick={() => handlePageChange(currentPage + 1)}>
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
                                <div className="row" key={index}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title text-primary">
                                                {notification.status === false ? (
                                                    <p className="badge badge-pill bg-soft-danger text-danger me-2">Đã ẩn</p>
                                                ) : (null)}
                                                {notification.title}
                                            </h5>
                                            <h6 className="card-subtitle mb-2 text-muted">
                                                {notification.nickname} | Ngày đăng: {convertDay(notification.create_time)}
                                            </h6>
                                            <div className="d-flex justify-content-between">
                                                <a className="card-link" type="button" data-bs-toggle="modal" data-bs-target="#detailNotificationModal" onClick={() => showModalDetails(notification)}>
                                                    Xem chi tiết
                                                </a>
                                                {notification.status ? (
                                                    <button type="button" className="btn btn-danger" onClick={() => hideNotifications(notification.notify_id)}>Ẩn thông báo</button>
                                                ) : (
                                                    <button type="button" className="btn btn-success" onClick={() => showNotifications(notification.notify_id)}>Hiện thông báo</button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
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
                                    <><p className="mt-2 fw-bold">Đường dẫn đính kèm:</p><a href={notificationDetail?.file_link} target="_blank" rel="noopener noreferrer">                                                        <img src="https://i.pinimg.com/564x/13/88/5f/13885f590c6070c7f106b0f19a17ab9b.jpg" alt="Ảnh file link" width={105} height={70} />
                                        {notificationDetail?.file_link}</a></>) : (null)}

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                {/* <!-- <button type="button" className="btn btn-primary">Save changes</button> --> */}
                            </div>
                        </div>
                    </div>
                </div>
            </main >


        </div >
    );
}
export default React.memo(NotifyManagementContent);
