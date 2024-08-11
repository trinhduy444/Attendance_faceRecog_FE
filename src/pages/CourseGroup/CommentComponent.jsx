import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2"
import { commentService } from '../../services/commentService';
import { userService } from '../../services/userService';
import { convertDay } from '../../utils/convertDay'
import LazyLoad from 'react-lazyload';

function CommentComponent({ post_id }) {
    const [comments, setComments] = useState([]);
    const [showAllComments, setShowAllComments] = useState(false);
    const [commentPost, setCommentPost] = useState('');
    const [user, setUser] = useState(null);

    const handleToggleComments = () => {
        setShowAllComments(!showAllComments);
    };

    const handleFetchComments = async () => {
        const res = await commentService.getAllComments(post_id)
        if (res.status === 200) {
            setComments(res.metadata)
        }
    }
    const handleFetchInfo = async () => {
        const res = await userService.getProfile()
        if (res.status === 200) {
            setUser(res.metadata)
        }
    }
    useEffect(() => {
        handleFetchInfo()
        handleFetchComments()
    }, [])
    const handleCreateComment = async (e) => {
        e.preventDefault();
        if (commentPost.trim().length === 0) {
            console.log('No comments', commentPost.length)
            Swal.fire("Cảnh báo", "Vui lòng nhập nội dung bình luận!", "warning");
            return;
        }
        const requestBody = {
            ref_id: post_id,
            ref_table: 'postgroup',
            content: commentPost
        }
        const response = await commentService.createComment(requestBody)
        if (response.status === 201) {
            const newComment = {
                content: commentPost,
                avatar_path: user.avatar_path,
                nickname: user.nickname,
                create_time: new Date().toISOString()
            };
            setComments(prevComments => [newComment, ...prevComments]);
            setCommentPost('');
            return
        } else {
            Swal.fire("Có gì đó không đúng", "Vui lòng bình luận lại", "warning")
            return;
        }
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCreateComment(e);
        }
    };
    return (
        <div className="card-footer">
            <div className="showComment">
                {comments.length > 0 ? (
                    <div className="commentQuantity">
                        <a type='button' onClick={handleToggleComments}>
                            <i className='bi bi-people'> {comments.length} Bình Luận</i>
                            <i className={`bi bi-chevron-${showAllComments ? 'up' : 'down'}`}></i>
                        </a>
                        {comments.slice(0, showAllComments ? comments.length : 2).map((comment, index) => (
                            <div className="commentContent mt-2" key={index}>
                                <div className="row">
                                    <img src={comment.avatar_path} alt="ảnh..." className="col-1 rounded-circle" width="40" />

                                    <div className="col-11">
                                        <p><b>{comment.nickname}</b> <span className="small text-muted">{convertDay(comment.create_time)}</span></p>
                                        <p className='fw-normal'>{comment.content}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="commentQuantity">
                        <i className='bi bi-people'> 0 Bình Luận</i>
                    </div>
                )}
            </div>
            <form className='mt-4 d-flex justify-content-between' onSubmit={handleCreateComment} >

                <img src={user?.avatar_path} alt="ảnh người bình luận..."
                    className="rounded-circle" width="50" />
                <input className="commentPost" type="text" placeholder="Nhập bình luận..." value={commentPost}
                    onChange={(e) => setCommentPost(e.target.value)} />
                <button type="submit" className="btnCommentPost" ><i className="bi bi-send" onKeyDown={handleKeyDown}></i> Gửi</button>
            </form>
        </div>
    )

}
export default React.memo(CommentComponent);
