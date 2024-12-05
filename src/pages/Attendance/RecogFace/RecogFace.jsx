import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import RecogFaceContent from "./RecogFaceContent";
import { decodeId } from "../../../utils/secureEncoding";
import { courseService } from '../../../services/courseService';

export const RecogFace = () => {
    const { course_group_id } = useParams()
    const navigate = useNavigate();
    const [isPermission, setIsPermission] = useState(false)

    const checkAccessLinkRecog = async (courseGroupId) => {
        const response = await courseService.checkTeacherAccessCourseGroup(courseGroupId)
        if (response.status !== 200) {
            navigate('/error')
        }
        setIsPermission(true)

    }

    useEffect(() => {
        const decode_course_group_id = decodeURIComponent(decodeId(course_group_id))
        checkAccessLinkRecog(decode_course_group_id)
        document.title = "Điểm danh"
    }, [])
    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full recogFace">
            <div className="h-screen flex-grow-1">
                {isPermission === true ? (<RecogFaceContent course_group_id={decodeURIComponent(decodeId(course_group_id))} />
                ) : null}
            </div>
        </div>
    )
}