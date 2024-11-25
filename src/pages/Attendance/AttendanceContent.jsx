import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import { courseService } from '../../services/courseService';
import { encodeId } from '../../utils/secureEncoding';
import Swal from 'sweetalert2';
import { formatDate } from '../../utils/convertDay'
import { requestService } from '../../services/requestService';

function AttendanceContent({ userId }) {
    const closeModalButtonRef = useRef();

    // Semester
    const [allSemester, setAllSemester] = useState([]);
    const [allCourseGroup, setAllCourseGroup] = useState([]);

    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [requestContent, setRequestContent] = useState({});

    const fetchSemeter = async () => {
        const response = await courseService.getAllSemester();
        if (response.status === 200) {
            setAllSemester(response.metadata)
        } else {
            Swal.fire("Thất bại!", "Vui lòng thử lại sau!", "error")
            return
        }
    }

    useEffect(() => { fetchSemeter() }, []);

    function handleSelectSemester(e) {
        fetchCourseGroupInfo(e.target.value);
    }

    const formatData = (metadata) => {
        return metadata.reduce((result, current) => {
            let existing = result.find(item => item.course_group_id === current.course_group_id);

            // Chỉ thêm dữ liệu vào attendances nếu attend_date không phải null
            const validAttendance = current.attend_date
                ? {
                    attend_yn: current.attend_yn,
                    late_yn: current.late_yn,
                    note: current.note,
                    enter_time: current.enter_time,
                    attend_date: current.attend_date
                }
                : null;

            if (existing) {
                if (validAttendance) {
                    existing.attendances.push(validAttendance);
                }
            } else {
                result.push({
                    ...current,
                    attendances: validAttendance ? [validAttendance] : [] // Nếu không có attendance hợp lệ, tạo mảng rỗng
                });
            }

            return result;
        }, []).map(item => {
            const { attend_yn, late_yn, note, enter_time, attend_date, ...rest } = item;
            return rest; // Loại bỏ trường không cần thiết ngoài attendances
        });
    };

    const fetchCourseGroupInfo = async (semester_year_id) => {
        const response = await courseService.getCourseGroupStudent(semester_year_id);
        if (response.status === 200) {
            const formattedData = formatData(response.metadata);
            setAllCourseGroup(formattedData);
        } else {
            Swal.fire("Thất bại!", "Có lỗi xảy ra, vui lòng thử lại!", "error");
        }
    };
    const setContent = (content) => {
        setRequestContent((requestContent) => ({ ...requestContent, content: content }));
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
    function handleCloseModelSendRequest() {
        setSelectedImageFile(null)
        setRequestContent({})
    }
    const displaySelectedImage = (event, imageId) => {
        const file = event.target.files[0];
        setSelectedImageFile(file); // Lưu file vào state
        const reader = new FileReader();
        reader.onload = () => {
            document.getElementById(imageId).src = reader.result; // Hiển thị hình ảnh đã chọn
        };
        reader.readAsDataURL(file);
    };
    const handleViewCreateAttendanceRequest = (attendDate, courseGroupId) => {
        console.log(attendDate, courseGroupId);

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

    return (
        <main className="py-6 bg-surface-secondary">
            <div className="container">
                <div className="row">
                    <div className="col-7">
                        <div className="form-group">
                            <select id="selectSemester" data-live-search="true"
                                className="form-select border border-black"
                                aria-label="Default select example"
                                onChange={handleSelectSemester}
                            >
                                <option value=''>--Chọn học kỳ | Choose semester--</option>

                                {allSemester.length > 0 && allSemester.map((semester, index) => (
                                    <option key={index} value={semester.semester_year_id}>--- {semester.semester_year_name} ---</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-5">

                    </div>

                </div>
                <div className="row mt-4">
                    <div className="col-12">
                        <table className="table table-striped border">
                            <thead>
                                <tr>
                                    <th scope="col" ><p className="fw-bold">Môn học</p></th>
                                    <th scope="col">Lịch học</th>
                                    <th scope="col">Dữ liệu điểm danh</th>
                                    <th scope="col">Tình trạng</th>
                                    <th scope="col">Tổng vắng</th>
                                    <th scope="col">Chi tiết</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allCourseGroup.map((courseGroup, index) => (
                                    <tr key={index}>
                                        <th scope="row">{courseGroup.course_name} ({courseGroup.course_code}) | {courseGroup.group_code}</th>
                                        <td>Ca: {courseGroup.shift_code.slice(2)} | Tuần: {courseGroup.week_from} ... {courseGroup.week_to}</td>
                                        <td>
                                            {courseGroup.attendances.length > 0 ? (
                                                <table className='table table-bordered table-sm'>
                                                    <tbody>
                                                        {courseGroup.attendances.map((attendance, index) => (
                                                            <tr key={index}>
                                                                <td className="fw-bold">{formatDate(attendance.attend_date) || 'N/A'}</td>
                                                                <td className="fw-bold">{attendance.enter_time}</td>
                                                                <td>
                                                                    {attendance.late_yn
                                                                        ? "Trễ"
                                                                        : attendance.attend_yn
                                                                            ? "Có mặt"
                                                                            : <a type="button" data-bs-toggle="modal" data-bs-target="#attendanceRequestModal" className='text-danger link-offset-2 link-underline link-underline-opacity-75' disabled={attendance.attend_date} onClick={() => handleViewCreateAttendanceRequest(attendance.attend_date, courseGroup.course_group_id)}>Vắng <i className="bi bi-flag"></i></a>}
                                                                </td>
                                                                {attendance.note ? <td>Ghi chú: {attendance.note}</td> : <td></td>}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <div className="text-center">Không có dữ liệu</div>
                                            )}
                                        </td>

                                        <td className={
                                            courseGroup.status === false ? "text-success" :
                                                courseGroup.ban_yn === false ? "text-warning" :
                                                    "text-danger"
                                        }>
                                            {
                                                courseGroup.status === false ? "Đã hoàn thành" :
                                                    courseGroup.ban_yn === false ? "Bình thường" :
                                                        "Cấm thi"
                                            }
                                        </td>

                                        <td>{courseGroup.total_absent}</td>
                                        <td><a href={`/attendance/detail/${encodeURIComponent(encodeId(courseGroup.course_group_id))}/${encodeURIComponent(courseGroup.ban_yn)}`}>Xem chi tiết</a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
            <div className="modal fade" id="attendanceRequestModal" tabIndex="-1" aria-labelledby="attendanceRequestModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="attendanceRequestModalLabel">Gửi yêu cầu chỉnh sửa điểm danh</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
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
export default React.memo(AttendanceContent);
