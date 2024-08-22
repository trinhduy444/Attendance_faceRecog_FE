import React, { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import { displayContent } from '../../../utils/displayContent'
import { convertDay } from '../../../utils/convertDay'
import { courseService } from "../../../services/courseService";
import { notifyService } from "../../../services/notifyService";
import sclogo from "../../../assets/images/sclogo.jpg";
export function CreateNotify() {
    const user = useSelector(state => state.auth.user);
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [content, setContent] = useState('');
    // Data
    const [selectedOption, setSelectedOption] = useState('users');
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Select
    const [userType, setUserType] = useState('allUsers');
    const [selectedCourseGroup, setSelectedCourseGroup] = useState('');

    const MAX_LENGTH = 2048

    useEffect(() => {
        document.tilte = 'Tạo thông báo';

        switch (selectedOption) {
            case 'users': break;
            case 'courseGroup': fetchDataAllCG(); break;
        }
    }, [selectedOption])

    const fetchDataAllCG = async () => {
        const res = await courseService.getAllCourseGroupActive();
        if (res.status === 200) {
            setData(res.metadata);
        }else {
            Swal.fire("Thất bại!", "Vui lòng thử lại!", "error")
            return
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();

    };
    const hideModalChose = () => {
        document.querySelector('#btnCloseChose').click();
        setLink('')
        setTitle('')
        setContent('')
    }
    const handleCreateNotification = async (e) => {
        e.preventDefault();
        let valuetype = ''
        if (selectedOption === 'users') {
            console.log(userType)
            valuetype = userType;
        } else if (selectedOption === 'courseGroup') {
            valuetype = selectedCourseGroup
        }
        const requestBody = {
            title: title,
            file_link: link,
            content: content,
            type: selectedOption,
            valueType: valuetype
        }
        const response = await notifyService.createNotify(requestBody)
        if (response.status === 201) {
            Swal.fire("Thành công", "Tạo thông báo thành công", 'success')
            return hideModalChose();
        }else {
            Swal.fire("Thất bại!", "Vui lòng thử lại sau!", "error")
            return
        }

    };
    const filteredData = data.filter(coursegroup =>
        `${coursegroup.course_name} ${coursegroup.group_code}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="h-screen flex-grow-1 overflow-y-lg-auto">
            <header className="bg-surface-primary border-bottom pt-3 pb-3">
                <div className="container">
                    <div className="mb-npx">
                        <div className="row align-items-center">
                            <div className="col-sm-6 col-12 mb-4 mb-sm-0">

                                <h1 className="h2 mb-0 ls-tight">
                                    <a href="/"><img src={sclogo} width="40" className="rounded-circle" /></a>
                                    TẠO THÔNG BÁO</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="py-6 bg-surface-secondary">
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="row d-flex justify-content-end">
                            <div className="col-8"><h4>Tạo thông báo</h4></div>
                            <div className="col-2 d-flex justify-content-center"><a type="button" data-bs-toggle="modal" data-bs-target='#detailNotificationModal' className="btn btn-white border border-black">Xem trước</a>
                            </div>
                            <div className="col-2"><button type="submit" className="btn btn-primary" data-bs-toggle="modal" data-bs-target='#choseReceived'>Tạo thông báo</button>
                            </div>
                        </div>
                        <div className="row">
                            <label className="fw-bold">Tiêu đề</label>
                            <input type="text" className='form-control'
                                placeholder="Nhập tiêu đề thông báo..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                style={{ textTransform: 'uppercase' }}
                                required />
                        </div>

                        <div className="row">
                            <label className="fw-bold">Đường dẫn nếu có</label>
                            <input type="url" className='form-control'
                                placeholder="Nhập đường dẫn nếu có..."
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                            />
                        </div>
                        <div className="row mt-3">
                            <div className="row">
                                <div className="col-8">
                                    <label htmlFor="contentPost" className='fw-bold contentLabel'>Nhập nội dung bài viết:</label>
                                </div>
                                <div className="col-4"> <i>{content.length}/{MAX_LENGTH} ký tự</i></div>
                            </div>
                            <div className="row">
                                <ReactQuill
                                    value={content}
                                    onChange={setContent}
                                    placeholder='Nhập nội dung..'
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
                    </form>

                </div>
                <div className="modal fade" id="detailNotificationModal" tabIndex="-1"
                    aria-labelledby="detailNotificationModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="detailNotificationModalLabel">Xem trước thông báo</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <h2 className="d-flex justify-content-center text-primary text-uppercase">
                                    {title}
                                </h2>
                                <p className="d-flex justify-content-center">
                                    {user.nickname} | Ngày đăng: {convertDay(new Date())}
                                </p>
                                <span >
                                    {displayContent({ content: content })}
                                </span>
                                {link ? (<div>
                                    <label className="fw-static">Tập tin đính kèm:</label>
                                    <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                                </div>) : (null)}


                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                {/* <!-- <button type="button" className="btn btn-primary">Save changes</button> --> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='modal fade' id="choseReceived" tabIndex="-1"
                    aria-labelledby="choseReceived" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="choseReceived">Chọn nhóm thông báo</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form onSubmit={handleCreateNotification}>
                                <div className="modal-body">
                                    <h4>Chọn nhóm người để gửi thông báo</h4>
                                    <div className="form-check mt-2">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            id="users"
                                            name="notificationGroup"
                                            value="users"
                                            checked={selectedOption === 'users'}
                                            onChange={(e) => setSelectedOption(e.target.value)}
                                        />
                                        <label htmlFor="users" className="form-check-label">Người dùng</label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            id="courseGroup"
                                            name="notificationGroup"
                                            value="courseGroup"
                                            checked={selectedOption === 'courseGroup'}
                                            onChange={(e) => setSelectedOption(e.target.value)}
                                        />
                                        <label htmlFor="courseGroup" className="form-check-label">Nhóm môn học</label>
                                    </div>
                                    <hr className="text-black" />
                                    {selectedOption === 'users' ? (
                                        <div className="user-options mt-3 form-check">
                                            <h3>Chọn loại người dùng:</h3>
                                            <div>
                                                <input
                                                    className='form-check-input'
                                                    type="radio"
                                                    id="allUsers"
                                                    name="userType"
                                                    value="allUsers"
                                                    checked={userType === 'allUsers'}
                                                    onChange={(e) => setUserType(e.target.value)}
                                                />
                                                <label className="form-check-label" htmlFor="allUsers">Tất cả người dùng</label>
                                            </div>
                                            <div>
                                                <input
                                                    className='form-check-input'
                                                    type="radio"
                                                    id="admins"
                                                    name="userType"
                                                    value="admins"
                                                    checked={userType === 'admins'}
                                                    onChange={(e) => setUserType(e.target.value)}
                                                />
                                                <label className="form-check-label" htmlFor="admins">Tất cả quản trị</label>
                                            </div>
                                            <div>
                                                <input
                                                    className='form-check-input'
                                                    type="radio"
                                                    id="students"
                                                    name="userType"
                                                    value="students"
                                                    checked={userType === 'students'}
                                                    onChange={(e) => setUserType(e.target.value)}
                                                />
                                                <label className="form-check-label" htmlFor="students">Tất cả sinh viên</label>
                                            </div>
                                            <div>
                                                <input
                                                    className='form-check-input'
                                                    type="radio"
                                                    id="teachers"
                                                    name="userType"
                                                    value="teachers"
                                                    checked={userType === 'teachers'}
                                                    onChange={(e) => setUserType(e.target.value)}
                                                />
                                                <label className="form-check-label" htmlFor="teachers">Tất cả giảng viên</label>
                                            </div>
                                        </div>
                                    ) : selectedOption === 'courseGroup' ? (
                                        <div className="courseGroup-options mt-3 container">
                                            <h3>Chọn nhóm học:</h3>
                                            <div className="row">
                                                <input
                                                    className="col-6 form-control"
                                                    type="text"
                                                    placeholder="Tìm kiếm nhóm học..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />
                                                <select
                                                    className="form-select mt-2 col-6"
                                                    aria-label="Default select example"
                                                    value={selectedCourseGroup}
                                                    onChange={(e) => setSelectedCourseGroup(e.target.value)}
                                                >
                                                    <option value="" disabled>Chọn nhóm học</option>
                                                    {filteredData.length > 0 ? (
                                                        filteredData.map((coursegroup, index) => (
                                                            <option key={index} value={coursegroup.course_group_id}>
                                                                {coursegroup.course_name} {coursegroup.group_code}
                                                            </option>
                                                        ))
                                                    ) : (
                                                        <option>Không có kết quả</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    ) : null}



                                </div>
                                <div className="modal-footer">
                                    <button type="button" id='btnCloseChose' className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                    <button type="submit" className="btn btn-primary">Tạo thông báo</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </main>


        </div >
    );
}

