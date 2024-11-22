import React, { useEffect, useRef, useState } from "react"
import Swal from "sweetalert2"
import { useSelector } from 'react-redux';
import { requestService } from '../../services/requestService';
import { convertDay } from '../../utils/convertDay'
import { displayContent } from '../../utils/displayContent'

import Pagination from "../AdminDashBoard/UserManagement/Pagination"

function AttendanceRequestContent({ attendanceRequests, onChange }) {
    const user = useSelector(state => state.auth.user);
    const closeBtnRef = useRef();
    const [attendanceRequestDetail, setAttendanceRequestDetail] = useState();
    const [index, setIndex] = useState(-1);

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const attendanceRequestsPerPage = 3;
    useEffect(() => {
        
    }, [])

    // Handle Pagination
    const totalPages = Math.ceil(attendanceRequests.length / attendanceRequestsPerPage);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Show detail
    const showModalDetails = (attendanceRequest, index) => {
        setAttendanceRequestDetail(attendanceRequest);
        setIndex(index);
    }

    // Handle approve request
    const handleApproveRequest = async (request_id) => {
        Swal.fire({
            title: `Xác nhận duyệt yêu cầu điểm danh?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await requestService.approveAttendanceRequest(request_id);
                if (response.status === 200) {
                    closeBtnRef.current.click();
                    onChange(index, 2);
                    Swal.fire('Thành công!', 'Duyệt yêu cầu thành công', 'success', 1500);
                } else if (response.status === 403) {
                    Swal.fire("Không có quyền!", "Người dùng không có quyền duyệt yêu cầu này!", 'warning')
                } else {
                    Swal.fire("Lỗi!", "Duyệt yêu cầu điểm danh thất bại!", 'error');
                }
            }
        });
    }

    // Handle reject request
    const handleRejectRequest = async (request_id) => {
        Swal.fire({
            title: `Xác nhận hủy yêu cầu điểm danh?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await requestService.rejectAttendanceRequest(request_id);
                if (response.status === 200) {
                    closeBtnRef.current.click();
                    onChange(index, 9);
                    Swal.fire('Thành công!', 'Hủy yêu cầu thành công', 'success', 1500);
                } else if (response.status === 403) {
                    Swal.fire("Không có quyền!", "Người dùng không có quyền hủy yêu cầu này!", 'warning')
                } else {
                    Swal.fire("Lỗi!", "Hủy yêu cầu điểm danh thất bại!", 'error');
                }
            }
        });
    }
    
    // Render status
    const renderStatus = (param) => {
        switch(param) {
            case 0:
                return (<p className="badge badge-pill bg-soft-secondary text-secondary me-2">Nháp</p>);
            case 1:
                return (<p className="badge badge-pill bg-soft-warning text-warning me-2">Chờ xử lý</p>);
            case 2:
                return (<p className="badge badge-pill bg-soft-success text-success me-2">Đã duyệt</p>);
            case 9:
                return (<p className="badge badge-pill bg-soft-danger text-danger me-2">Hủy</p>);
            default:
                return '';
        }
    }

    // pagination part 2
    const indexOfLastAttendanceRequest = currentPage * attendanceRequestsPerPage;
    const indexOfFirstAttendanceRequest = indexOfLastAttendanceRequest - attendanceRequestsPerPage;
    const currentAttendanceRequests = attendanceRequests.slice(indexOfFirstAttendanceRequest, indexOfLastAttendanceRequest);

    return (
        <div className="row">
            <div className="col-3 mt-2 d-flex justify-content-center">
                <h5> Trang {currentPage} trong <b className="text-danger">{totalPages}</b> trang </h5>
            </div>
            <div className="col-9">
                <Pagination
                    totalItems={attendanceRequests.length}
                    itemsPerPage={attendanceRequestsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
            <div className="div-attendance-request">
                {currentAttendanceRequests.map((attendanceRequest, index) => (
                    <div className="row mb-1" key={index}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-primary">
                                    {renderStatus(attendanceRequest.status)}
                                    {attendanceRequest.title}
                                </h5>
                                <h6 className="card-subtitle mb-2 text-muted">
                                    {attendanceRequest.nickname0} | Ngày đăng: {convertDay(attendanceRequest.create_time)}
                                </h6>
                                <div className="d-flex justify-content-between">
                                    <a className="card-link" type="button" data-bs-toggle="modal" data-bs-target="#detailAttendanceRequestModal" onClick={() => showModalDetails(attendanceRequest, indexOfFirstAttendanceRequest + index)}>
                                        Xem chi tiết
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="detailAttendanceRequestModal" tabIndex="-1" aria-labelledby="detailAttendanceRequestModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="detailAttendanceRequestModalLabel">Chi tiết yêu cầu</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h2 className="d-flex justify-content-center text-primary">
                                {attendanceRequestDetail?.title}
                            </h2>
                            <p className="d-flex justify-content-center">
                                {attendanceRequestDetail?.nickname0} | Ngày đăng: {convertDay(attendanceRequestDetail?.create_time)}
                            </p>
                            <div className="row">
                                <div className="col-3 d-flex justify-content-center">
                                    <img className="img-fluid-attend" src={attendanceRequestDetail?.proof_image_path ? attendanceRequestDetail?.proof_image_path : "https://via.placeholder.com/150"} alt="Ảnh minh chứng" />
                                </div>
                                <div className="col-9 d-flex justify-content-start">
                                    {displayContent({ content: attendanceRequestDetail?.content })}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {(attendanceRequestDetail?.status === 1 && (user.role_id === 1 || user.role_id === 2)) ?
                                (<>
                                    <button type="button" className="btn btn-primary" onClick={() => handleApproveRequest(attendanceRequestDetail?.request_id)}>Duyệt</button>
                                    <button type="button" className="btn btn-danger" onClick={() => handleRejectRequest(attendanceRequestDetail?.request_id)}>Hủy</button>
                                </>) : ''
                            }
                            <button type="button" ref={closeBtnRef} className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default React.memo(AttendanceRequestContent);
