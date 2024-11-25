import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import { courseService } from '../../services/courseService';
import { userService } from '../../services/userService';
import { attendanceService } from '../../services/attendanceService';
import { requestService } from '../../services/requestService';
import { convertDay } from '../../utils/convertDay';
function AttendanceDetailContent({ userId, courseGroupId, ban_yn }) {
    const closeModalButtonRef = useRef();
    const [courseInfo, setCourseInfo] = useState('');
    const [userInfo, setUserInfo] = useState('');
    const [attendanceInfo, setAttendanceInfo] = useState([]);
    const [attendDetail, setAttendDetail] = useState({});
    const [requestContent, setRequestContent] = useState({});
    const [selectedImageFile, setSelectedImageFile] = useState(null);

    useEffect(() => {
        fetchUserInfo()
        fetchCourseGroupInfo(courseGroupId)
        fetchAttendanceInfo(userId, courseGroupId)
    }, [])

    const fetchAttendanceInfo = async (studentId, course_group_id) => {
        const response = await attendanceService.getAttendanceHaveUserId(studentId, course_group_id);
        if (response.status === 200) {
            console.log("Detail: " + JSON.stringify(response.data.data));
            
            setAttendanceInfo(response.data.data);
        } else {
            Swal.fire("Thất bại!", "Vui lòng thử lại sau!", "error")
            return
        }
    }
    const totalAbsentCount = attendanceInfo.reduce((total, attend) => {
        return attend.attend_yn === false ? total + 1 : total;
    }, 0);
    const fetchUserInfo = async () => {
        const response = await userService.getSomeinfo();
        if (response.status === 200) {
            setUserInfo(response.metadata)
        } else {
            Swal.fire("Thất bại!", "Vui lòng thử lại sau!", "error")
            return
        }
    }
    const fetchCourseGroupInfo = async (course_group_id) => {
        const response = await courseService.getCourseGroupStudent(undefined, course_group_id)
        // console.log(response.metadata[0]);
        if (response.status === 200) {
            setCourseInfo(response.metadata[0])
        }
    }

    const handleVieweDetails = async (attenDate) => {
        const response = await attendanceService.getAttendanceDetail(userId, courseGroupId, attenDate)
        if (response.status === 200) {
            setAttendDetail(response.data.metadata)
        } else {
            Swal.fire("Thất bại!", "Vui lòng thử lại sau!", "error")
            return
        }
    }

    const handleCloseModel = () => {
        setAttendDetail({})
    }

    const setContent = (content) => {
        setRequestContent((requestContent) => ({ ...requestContent, content: content }));
    }

    // Handle show attendance request modal
    const handleViewCreateAttendanceRequest = (attendDate) => {
        setRequestContent({
            student_id: userId,
            course_group_id: courseGroupId,
            attend_date: attendDate,
            attend_type: 0,
            proof_image_path: '',
            file_link: '',
            content: '',
            response: '',
            request_type: 0,
            status: 1
        });
    }

    // Create attendance request
    const handleCreateAttendanceRequest = async () => {
        try {
            Swal.fire({
                title: 'Đang gửi yêu cầu...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            const response = await requestService.createAttendanceRequest(requestContent);

            if (response.status === 201) {
                const requestId = response.data.data.request_id;

                if (selectedImageFile) {
                    await requestService.uploadImageRequest(requestId, selectedImageFile);
                }

                closeModalButtonRef.current.click();

                Swal.fire({
                    icon: 'success',
                    title: 'Thành công!',
                    text: 'Gửi yêu cầu thành công',
                    timer: 1500,
                    showConfirmButton: false,
                });
            } else {
                Swal.fire('Thất bại!', 'Có lỗi xảy ra, vui lòng thử lại sau.', 'error');
                return;
            }
        } catch (error) {
            Swal.fire('Thất bại!', 'Bạn đã tạo đơn khiếu nại cho ngày này rồi.', 'error');
        }
    };

    const displaySelectedImage = (event, imageId) => {
        const file = event.target.files[0];
        setSelectedImageFile(file); // Lưu file vào state
        const reader = new FileReader();
        reader.onload = () => {
            document.getElementById(imageId).src = reader.result; // Hiển thị hình ảnh đã chọn
        };
        reader.readAsDataURL(file);
    };
    function handleCloseModelSendRequest() {
        console.log("vo")
        setSelectedImageFile(null)
        setRequestContent({})
    }
    return (
        <main className="py-2 bg-surface-secondary">
            <div className="container">
                <div className="mb-5 row">
                    <div className="d-flex justify-content-center">
                        <h2 className="text-primary">{courseInfo?.course_name} ({courseInfo?.course_code}) </h2>
                    </div>
                </div>
                <div className="p-5 border border-dark">
                    <div className="mb-2 row">
                        <div className="col-6 d-flex justify-content-center">
                            <h3>Thông tin sinh viên</h3>
                        </div>
                        <div className="col-6 d-flex justify-content-center">
                            <h3>Thông tin môn học</h3>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3 d-flex justify-content-start">
                            <p><b>Tên sinh viên:</b> {userInfo?.nickname}</p>
                        </div>
                        <div className="col-3 d-flex justify-content-start">
                            <p><b>MSSV:</b> {userInfo?.username}</p>
                        </div>
                        <div className="col-3 d-flex justify-content-start">
                            <p><b>Tên môn học:</b> {courseInfo?.course_name} </p>
                        </div>
                        <div className="col-3 d-flex justify-content-start">
                            <p><b>Mã môn học:</b> {courseInfo?.course_code}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 d-flex justify-content-start">
                            <p><b>Khoa:</b> {userInfo?.faculty_name}</p>
                        </div>
                        <div className="col-3 d-flex justify-content-start">
                            <p><b>Lớp:</b> 20050261</p>
                        </div>
                        <div className="col-3 d-flex justify-content-start">
                            <p><b>Tên giảng viên:</b>  {courseInfo?.nickname}</p>
                        </div>
                        <div className="col-3 d-flex justify-content-start">
                            <p><b>Nhóm học:</b> {courseInfo?.group_code}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                        </div>
                        <div className="col-3 d-flex justify-content-start">
                            <p><b>Tuần học:</b> từ {courseInfo?.week_from} đến {courseInfo?.week_to}</p>
                        </div>
                        <div className="col-3 d-flex justify-content-start">
                            <p><b>Tổng số ca học:</b> {courseInfo?.total_shift} </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                        </div>

                        <div className="col-3 d-flex justify-content-start">
                            <p><b>Ca học:</b> {courseInfo?.shift_code}</p>
                        </div>
                        <div className="col-3 d-flex justify-content-start">
                            <p><b>Giờ học:</b> {courseInfo?.start_time} - {courseInfo?.end_time} </p>
                        </div>
                    </div>
                </div>
                <div className="m-2 border border-dark row">
                    <table className="table table-striped">
                        <thead>
                            <tr className="table-primary">
                                <th scope="col"><b>Buổi</b></th>
                                <th scope="col"><b>Ngày Tháng, Năm</b></th>
                                <th scope="col"><b>Giờ điểm danh</b></th>
                                <th scope="col"><b>Trạng thái</b></th>
                                <th scope="col"><b>Chi tiết</b></th>
                                <th scope="col"><b>Khiếu nại</b></th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceInfo.map((attend, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{convertDay(attend.attend_date)}</td>
                                    <td>{attend.enter_time}</td>
                                    <td
                                        className={
                                            attend.attend_yn === true
                                                ? attend.late_yn === true
                                                    ? 'text-warning'
                                                    : 'text-success'
                                                : 'text-danger' 
                                        }
                                    >
                                        {attend.attend_yn === true
                                            ? attend.late_yn === true
                                                ? 'Trễ' 
                                                : 'Có mặt'
                                            : 'Vắng'
                                        }
                                    </td>
                                    <td><a className="card-link" type="button" data-bs-toggle="modal" data-bs-target="#detailAttendanceModal" onClick={() => handleVieweDetails(attend.attend_date)}>Xem chi tiết</a></td>
                                    <td><button type="button" data-bs-toggle="modal" data-bs-target="#attendanceRequestModal" className='btn btn-danger' disabled={attend.attend_yn} onClick={() => handleViewCreateAttendanceRequest(attend.attend_date)}><i className="bi bi-flag"></i> Khiếu nại</button></td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className='table-primary'>
                                <th>Tổng: {attendanceInfo.length}</th>
                                <th>MSSV: {userInfo.username}</th>
                                <th>Tổng buổi vắng: {totalAbsentCount}</th>
                                <th className='text-primary'>{ban_yn === 'false' ? 'Bình Thường' : 'Cấm thi'}</th>
                                <th></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>

            </div>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="detailAttendanceModal" tabIndex="-1"
                aria-labelledby="detailAttendanceModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="detailAttendanceModalLabel">Chi tiết điểm danh</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h2 className="d-flex justify-content-center text-primary">
                                {courseInfo?.course_name} ({courseInfo?.course_code})
                            </h2>
                            <p className="d-flex justify-content-center">
                                {courseInfo?.nickname} | Nhóm {courseInfo?.group_code}
                            </p>
                            <div className="row">
                                <span className="d-flex justify-content-evenly">
                                    <p><b>Trạng thái: </b> {attendDetail?.attend_yn ? 'Có mặt' : 'Vắng'}
                                    </p>
                                    <p><b>Ngày: </b> {convertDay(attendDetail?.attend_date)}
                                    </p>
                                </span>
                                <span className="d-flex justify-content-evenly">
                                    <p><b>Ca học: </b> 01 (6:50 - 9:15)
                                    </p>
                                    <p><b>Giờ điểm danh: </b> {attendDetail?.enter_time === '00:00' ? 'Không điểm danh' : attendDetail.enter_time}
                                    </p>
                                </span>
                            </div>

                            <span className="mb-5 d-flex justify-content-start">
                                <p><b>Ghi chú(nếu có): </b> {attendDetail?.note ? attendDetail.note : 'Không có ghi chú'}
                                </p>
                            </span>
                            <div className="row">
                                <div className="col-6 d-flex justify-content-center">
                                    <img className="img-fluid-attend" src={attendDetail.avatar_path ? attendDetail.avatar_path : "https://via.placeholder.com/150"} alt="Ảnh khuôn mặt gốc" />
                                </div>
                                <div className="col-6 d-flex justify-content-center">
                                    <img className="img-fluid-attend" src={attendDetail.attend_image_path ? attendDetail.attend_image_path : "https://via.placeholder.com/150"} alt="Ảnh khuôn mặt lúc điểm danh" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 d-flex justify-content-center"><i>Ảnh khuôn mặt gốc</i></div>
                                <div className="col-6 d-flex justify-content-center"><i>Ảnh khuôn mặt lúc điểm danh</i></div>
                            </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            {/* <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#attendanceRequestModal">Khiếu nại</button> */}
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModel}>Đóng</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Request Modal */}
            <div className="modal fade" id="attendanceRequestModal" tabIndex="-1" aria-labelledby="attendanceRequestModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="attendanceRequestModalLabel">Gửi yêu cầu chỉnh sửa điểm danh</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h2 className="d-flex justify-content-center text-primary">
                                {courseInfo?.course_name} ({courseInfo?.course_code})
                            </h2>
                            <p className="d-flex justify-content-center">
                                {courseInfo?.nickname} | Nhóm {courseInfo?.group_code}
                            </p>

                            <div className="row mt-3">
                                <div className="row">
                                    <div className="col-8">
                                        <label htmlFor="imageRequest" className='fw-bold contentLabel'>Chọn hình ảnh minh chứng:</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mb-4 d-flex justify-content-center">
                                        <img
                                            id="selectedImage"
                                            src="https://mdbootstrap.com/img/Photos/Others/placeholder.jpg"
                                            alt="example placeholder"
                                            style={{ width: '300px' }}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <div className="btn btn-primary btn-rounded" data-mdb-ripple-init>
                                            <label className="form-label text-white m-1" htmlFor="customFile1">
                                                Chọn ảnh
                                            </label>
                                            <input
                                                type="file"
                                                className="form-control d-none"
                                                id="customFile1"
                                                accept=".png, .jpg, .jpeg"
                                                onChange={(event) => displaySelectedImage(event, 'selectedImage')}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-8">
                                        <label htmlFor="contentPost" className='fw-bold contentLabel'>Nhập nội dung yêu cầu:</label>
                                    </div>
                                    {/* <div className="col-4"> <i>1/1 ký tự</i></div> */}
                                </div>
                                <div className="row">
                                    <ReactQuill
                                        value={requestContent.content}
                                        onChange={setContent}
                                        placeholder='Nhập nội dung...'
                                        modules={{
                                            toolbar: [
                                                [{ 'font': [] }],
                                                [{ 'header': [1, 2, 3, 4, false] }],
                                                ['bold', 'italic', 'underline'],
                                                [{ 'align': [] }],
                                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                                ['clean']
                                            ]
                                        }}
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            <button type="button" className="btn btn-primary" onClick={() => { handleCreateAttendanceRequest() }}>Gửi</button>
                            <button type="button" className="btn btn-secondary" ref={closeModalButtonRef} onClick={handleCloseModelSendRequest} data-bs-dismiss="modal">Đóng</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
export default React.memo(AttendanceDetailContent);
