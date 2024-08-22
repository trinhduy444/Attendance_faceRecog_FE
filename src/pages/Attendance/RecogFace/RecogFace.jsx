import React, { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom";
import RecogFaceContent from "./RecogFaceContent";
import { decodeId } from "../../../utils/secureEncoding";

export const RecogFace = () => {
    const { course_group_id } = useParams()
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const minutes = query.get('minutes');
    useEffect(() => {
        document.title = "Điểm danh"
    }, [])
    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full recogFace">
            <div className="h-screen flex-grow-1">
                <RecogFaceContent course_group_id={decodeURIComponent(decodeId(course_group_id))}  minutes={parseInt(minutes)}  />
            </div>
        </div>
    )
}