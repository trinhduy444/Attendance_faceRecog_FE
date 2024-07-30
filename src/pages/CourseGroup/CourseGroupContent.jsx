import React, { useEffect, useState } from 'react';
import { courseService } from "../../services/courseService";
import { encodeId } from '../../utils/secureEncoding';
function CourseGroupContent({ role }) {
    const [courseGroups, setCourseGroups] = useState([])
    useEffect(() => {
        handleFetchData()
    }, [])

    const handleFetchData = async () => {
        if (role === 2) {
            const response = await courseService.getCourseGroupTeacher();
            if (response.status === 200) {
                setCourseGroups(response.metadata)
            }
        }
        else {
            const response = await courseService.getCourseGroupStudent();
            if (response.status === 200) {
                setCourseGroups(response.metadata)
            }
        }
    }
    return (
        <main className="py-6 bg-surface-secondary">
            <div className="container">
                <div className=" row">
                    {courseGroups.map((course, index) => (
                        <div className="col-4 mb-5" key={index}>
                            <div className="card border border-black" >
                                <div className="card-body">
                                    <div className="card-title classroom ps-2 pt-1 mb-2" style={{ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` }}>
                                        <h5><a href={`/coursegroup/detail/${encodeURIComponent(encodeId(course.course_group_id))}`} className="nameofSubject text-black">{course.course_name}</a></h5>
                                        <p>Object - Orented Programing</p>
                                        {course.avatar_path ? (<img src={course.avatar_path} alt="ảnh giảng viên..."
                                            className="rounded-circle position-absolute bottom-30 end-10" width="70" />) : (<img src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="ảnh giảng viên..."
                                                className="rounded-circle position-absolute bottom-30 end-10" width="70" />)}


                                    </div>
                                    <div className="card-text mb-2">
                                        <p><b>Giáo viên: </b>{course.nickname}</p>
                                        <p><b>Phòng: </b>{course.classroom_code} | <b>Nhóm: </b>{course.group_code}</p>
                                    </div>
                                    <div className="joinRoomBtn d-flex justify-content-end">
                                        <a href={`/coursegroup/detail/${encodeURIComponent(encodeId(course.course_group_id))}`} className="btn btn-success ">Vào phòng học <i className="bi bi-arrow-bar-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}



                </div>
            </div>

        </main>
    );
}
export default React.memo(CourseGroupContent);
