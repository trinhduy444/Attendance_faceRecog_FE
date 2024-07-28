import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import Swal from "sweetalert2"
import { postService } from '../../services/postService';
import { displayContent } from '../../utils/displayContent'
import { convertDay } from '../../utils/convertDay'
function CourseGroupDetailContent({ role, course_group }) {
    const [content, setContent] = useState('');
    const [posts, setPosts] = useState([]);
    // post edit
    const [editPost, setEditPost] = useState();
    const [editContent, setEditContent] = useState('');

    const MAX_LENGTH = 1024;
    // Fectch Data
    useEffect(() => {
        handleFetchData()
    }, [])
    const handleFetchData = async () => {
        const response = await postService.getAllPostValid(course_group)
        if (response.data.status === 200) {
            setPosts(response.data.metadata)
        }
    }
    // Check length title and content
    const checkLength = function (content, titlePost) {
        if (content.length > MAX_LENGTH) {
            Swal.fire('Cảnh báo!', 'Nội dung không được quá 2048 ký tự!', 'warning')
            return false;
        }
        if (titlePost.length > 255) {
            Swal.fire('Cảnh báo!', 'Tiêu đề không được quá 256 ký tự!', 'warning')
            return false;
        }
        return true
    }
    // Create Post
    const handleCreatePost = async (e) => {
        e.preventDefault();
        const titlePost = document.querySelector('#titlePost').value;
        const urlPost = document.querySelector('#urlPost').value;
        if (!checkLength(content, titlePost)) return false;

        const requestBody = {
            title: titlePost,
            content: content,
            file_link: urlPost
        }
        const res = await postService.createPost(course_group, requestBody);
        if (res.data.status === 201) {
            document.querySelector('#titlePost').value = '';
            document.querySelector('#urlPost').value = '';
            setContent('');
            document.getElementById('btnCloseCreate').click();
            Swal.fire("Thành công!", "Đã tạo bài đăng thành công!", 'success');
            return handleFetchData()
        }
        Swal.fire("Something wrong!", "Không thể tạo bài viết!", 'error');
        return
    }
    //Delete Post
    const handleDeletePost = async (post_id) => {
        console.log(`Delete post ${post_id}`)
        Swal.fire({
            title: "Bạn có chắc xóa bài viết?",
            icon: "question",
            showCancelButton: true,
            cancelButtonText: "Không xóa",
            confirmButtonText: "Xóa!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await postService.setPostInvalid(post_id);
                if (response.status === 200) {
                    Swal.fire("Đã xóa!", "", "success");
                    return handleFetchData()
                }
                Swal.fire("Có gì đó không ổn!", "", "warning");
                return
            }
        });
    }
    // Edit Post
    const clickModelEdit = async (post) => {
        setEditContent(post.content)
        setEditPost(post)
        console.log(content);
    };
    const handleEditPost = async (e) => {
        e.preventDefault();
        const titlePost = document.querySelector('#titlePostEdit').value;
        const urlPost = document.querySelector('#urlPostEdit').value;
        if (!checkLength(editContent, titlePost)) return false;

        const requestBody = {
            title: titlePost,
            content: editContent,
            file_link: urlPost
        }

        const res = await postService.updatePost(editPost.post_id, requestBody);
        if (res.status === 200) {

            Swal.fire("Thành công!", "Đã chỉnh sửa bài đăng đăng thành công!", 'success');
            document.getElementById('btnCloseEdit').click();
            return handleFetchData()

        }
        else {
            Swal.fire("Something wrong!", "Không thể chỉnh sửa bài viết!", 'error');
            return
        }

    };

    const handleCloseEdit = () => {
        setEditContent('');
        return
    }

    return (

        <main className="py-6 bg-surface-secondary">
            <div className="container ps-20 pe-20" >
                <div className="row classroomDetailHeader">
                    <img src="https://i.pinimg.com/564x/17/f8/bd/17f8bdc442823c9943fd1681445cd5ef.jpg" alt="" style={{ width: '100%', height: '300px' }} />
                    <h2 className="overlay-text">Môn Lập trình hướng đối tượng | N1-HK1-300401</h2>
                    <h3 className="overlay-text2">GV: Vũ Đình Hồng</h3>

                </div>
                <div className="main-classroom">
                    <div className="row mt-2">
                        <div className="col-9">
                            <div className="row">
                                {posts.map((post, index) => (
                                    <div className="col-12 mt-2" key={index}>
                                        <div className="card post-classroom">
                                            <div className="card-header d-flex justify-content-between">
                                                <div className="d-flex align-items-center">
                                                    <img src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="ảnh giảng viên..." className="rounded-circle" width="50" />
                                                    <div className="infoTeacherPost ms-2">
                                                        <h5>{post.nickname}</h5>
                                                        <p>{convertDay(post.create_time)}</p>
                                                    </div>
                                                </div>



                                                <div className="dropdown">
                                                    <button className="dropdown-toggle" type="button" id="dropdownPost" data-bs-toggle="dropdown" >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                        >
                                                            <circle cx="12" cy="12" r="1"></circle>
                                                            <circle cx="19" cy="12" r="1"></circle>
                                                            <circle cx="5" cy="12" r="1"></circle>
                                                        </svg>
                                                    </button>
                                                    <ul className="dropdown-menu border border-dark " aria-labelledby="dropdownPost">
                                                        <li><a className="dropdown-item btnEditPost" type='button' data-bs-toggle="modal"
                                                            data-bs-target="#editPost" onClick={() => clickModelEdit(post)}><i className="bi bi-pencil-square"></i> Chỉnh sửa</a></li>
                                                        <li><a className="dropdown-item btnDeletePost" type='button' onClick={() => handleDeletePost(post.post_id)}><i className="bi bi-trash"></i> Xóa bài</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <h3 className='text-center'>{post.title}</h3>
                                                <div>
                                                    {displayContent({ content: post.content })}
                                                </div>
                                                {post.file_link ? (<div className="file-display">
                                                    <a href={post.file_link} target="_blank" className="file-link">
                                                        <img src="https://lh3.googleusercontent.com/drive-storage/AJQWtBOPlCP5jv0j4AMwemI0MVMUnB_h2dfMVCj2T_6Rgs-tvE6iNhNArEfJPqUfTNVFPX458X6fuVH2OAU1VptuH6FIFjRJqwM5jm51tOOEOJj-u5k=w105-h70-c" alt="" width={105} height={70} />
                                                        Ngân sách hàng năm.xlsx
                                                    </a>
                                                </div>) : (null)}

                                            </div>
                                            <div className="card-footer d-flex justify-content-between">
                                                <img src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="ảnh giảng viên..."
                                                    className="rounded-circle" width="40" />
                                                <input className="commentPost" type="text" placeholder="Nhập bình luận..." />

                                                <button className="btnCommentPost bg-soft-success text-success"><i className="bi bi-send"></i> Gửi</button>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-3">
                            <div className="card event-classroom">
                                <div className="card-header">
                                    <h3>Sự kiện</h3>
                                </div>
                                <div className="card-body">
                                    <ul>
                                        <li>21/01: Các em nộp bài lab01</li>
                                        <li>22/01: Các em nộp bài lab02</li>
                                        <li>23/01: Các em nộp bài lab03</li>

                                    </ul>
                                </div>
                            </div>
                            {role === 2 ? (
                                <div className="row mt-2">
                                    <div className="col-6">
                                        <button type="button" data-bs-toggle="modal"
                                            data-bs-target="#createPost" className='btn btn-success'>Tạo bài đăng</button>
                                    </div>
                                    <div className="col-6">
                                        <button className='btn btn-success'>Tạo bài đăng</button>
                                    </div>
                                </div>
                            ) : (null)}
                        </div>

                    </div>


                </div>

            </div>
            {/* CREATE */}
            <div className="modal" id="createPost" tabIndex="-1" aria-labelledby="createPost" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Tạo bài đăng</h2>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleCreatePost}>
                            <div className="modal-body">
                                <div className="row">
                                    <label htmlFor="titlePost" className='fw-bold'>Nhập tiêu đề: </label>
                                    <input className='form-control' id='titlePost' name='titlePost' placeholder='Nhập tiêu đề...' type="text" required />
                                </div>
                                <div className="row mt-3">
                                    <label htmlFor="urlPost" className='fw-bold'>Nhập đường dẫn file(nếu có):</label>
                                    <input type="url" name="urlPost" className='form-control ' placeholder='Thêm đường dẫn...' id="urlPost" />
                                </div>
                                <div className="row mt-3">
                                    <div className="row">
                                        <div className="col-8">
                                            <label htmlFor="contentPost" className='fw-bold contentLabel'>Nhập nội dung bài viết:</label>

                                        </div>
                                        <div className="col-4"> <i>{content.length}/{MAX_LENGTH} ký tự</i></div>
                                    </div>

                                    <ReactQuill
                                        value={content}
                                        onChange={setContent}
                                        placeholder='Nhập nội dung..'
                                        modules={{
                                            toolbar: [
                                                [{ 'font': [] }],
                                                [{ 'header': [1, 2, 3, false] }],
                                                ['bold', 'italic', 'underline'],
                                                [{ 'align': [] }],
                                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                                ['clean']
                                            ]
                                        }}
                                    />
                                </div>


                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  id='btnCloseCreate'>Đóng</button>
                                <button type="submit" id="submitFileBtn" className="btn btn-success">Tạo bài viết</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* EDIT */}
            <div className="modal" id="editPost" tabIndex="-1" aria-labelledby="editPost" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Chỉnh sửa bài đăng</h2>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleEditPost}>
                            <div className="modal-body">
                                <div className="row">
                                    <label htmlFor="titlePostEdit" className='fw-bold'>Nhập tiêu đề: </label>
                                    <input className='form-control' id='titlePostEdit' name='titlePostEdit' placeholder='Nhập tiêu đề...' defaultValue={editPost?.title} type="text" required />
                                </div>
                                <div className="row mt-3">
                                    <label htmlFor="urlPostEdit" className='fw-bold'>Nhập đường dẫn file(nếu có):</label>
                                    <input type="url" name="urlPostEdit" className='form-control ' placeholder='Thêm đường dẫn...' defaultValue={editPost?.file_link} id="urlPostEdit" />
                                </div>
                                <div className="row mt-3">
                                    <div className="row">
                                        <div className="col-8">
                                            <label htmlFor="contentPost" className='fw-bold contentLabel'>Nhập nội dung bài viết:</label>

                                        </div>
                                        <div className="col-4"> <i>{editContent.length}/{MAX_LENGTH} ký tự</i></div>
                                    </div>

                                    <ReactQuill
                                        value={editContent}
                                        onChange={setEditContent}
                                        placeholder='Nhập nội dung..'
                                        modules={{
                                            toolbar: [
                                                [{ 'font': [] }],
                                                [{ 'header': [1, 2, 3, false] }],
                                                ['bold', 'italic', 'underline'],
                                                [{ 'align': [] }],
                                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                                ['clean']
                                            ]
                                        }}
                                    />
                                </div>


                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id='btnCloseEdit' onClick={handleCloseEdit}>Đóng</button>
                                <button type="submit" id="submitFileBtn" className="btn btn-success">Chỉnh sửa</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
export default React.memo(CourseGroupDetailContent);
