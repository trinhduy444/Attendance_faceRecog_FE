import * as faceapi from '@vladmandic/face-api';
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { dateUtils } from '../../../utils/dateUtils';
import { userService } from '../../../services/userService';
import { courseService } from '../../../services/courseService';
import { attendanceService } from '../../../services/attendanceService';
import AttendanceList from './AttendanceList';
function RecogFaceContent({ course_group_id }) {

    const webcamRef = useRef(null);
    const webcamCanvasRef = useRef(null);
    const dataCanvasRef = useRef(null);
    const recognizedStudents = useRef(new Map());

    const [courseGroupInfo, setCourseGroupInfo] = useState(null);
    const [attendListSuccess, setAttendListSuccess] = useState([]);
    const [isUploading, setIsUploading] = useState(0);

    useEffect(() => {
        const loadModels = async () => {
            await Promise.all([
                faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
                faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
                faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            ]);
            console.log("Models loaded!");
        };
        loadModels();
        handleFetchCourseGroupInfo(course_group_id)
    }, []);

    const detectFaces = async () => {
        if (
            !webcamRef.current ||
            !webcamRef.current.video ||
            webcamRef.current.video.readyState !== 4
        ) {
            return; // Đảm bảo webcam đã sẵn sàng
        }

        const video = webcamRef.current.video;

        // Kích thước hiển thị
        const displaySize = { width: video.videoWidth, height: video.videoHeight };
        faceapi.matchDimensions(webcamCanvasRef.current, displaySize);

        // Vẽ video lên canvas
        const ctx = webcamCanvasRef.current.getContext('2d');
        webcamCanvasRef.current.width = video.videoWidth;
        webcamCanvasRef.current.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

        // Nhận diện khuôn mặt
        const detections = await faceapi
            .detectAllFaces(video, new faceapi.SsdMobilenetv1Options())
            .withFaceLandmarks()
            .withFaceDescriptors();

        // Resize kết quả
        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        // Gọi API kiểm tra vector
        const labeledDetections = await Promise.all(
            resizedDetections.map(async (detection) => {
                const descriptor = Array.from(detection.descriptor);
                // console.log("vecotr", JSON.stringify(descriptor));

                try {
                    const response = await userService.findClosestVector(descriptor);
                    console.log("vecotr", response.data.distance, JSON.stringify(descriptor));

                    if (response.status === 200) {
                        const studentId = response.data.studentId;
                        const label = response.data.mssv;
                        const currDatetime = new Date();
                        const currDate = currDatetime.toISOString().split('T')[0] + 'T00:00Z';
                        const currTime = dateUtils.getTimeString(currDatetime, 'hh:mm');

                        const requestBody = {
                            studentId: studentId,
                            courseGroupId: course_group_id, // Cần đảm bảo biến này tồn tại
                            attendDate: currDate,
                            attendType: 0,
                            attendTime: currTime,
                            attendImagePath: '' // Sẽ được cập nhật sau nếu có ảnh
                        };

                        if (!recognizedStudents.current.has(studentId)) {
                            recognizedStudents.current.set(studentId, currDate);

                            const fullImageCanvas = captureFullImage();

                            processAfterRecognition(fullImageCanvas, label, requestBody);
                        }


                        return { ...detection, label, studentId };
                    } else if (response.status === 203) {
                        return { ...detection, label: "unknown" };
                    }
                } catch (err) {
                    console.error("Error checking vector:", err);
                    return { ...detection, label: "unknown" };
                }
            })
        );

        drawBoxes(labeledDetections, displaySize);
    };


    const captureFullImage = () => {
        if (!webcamRef.current || !webcamRef.current.video) {
            console.error("Webcam not ready");
            return null;
        }

        // Tạo một canvas mới
        const canvas = document.createElement('canvas');
        const video = webcamRef.current.video;

        // Đặt kích thước canvas giống với kích thước video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Vẽ toàn bộ khung hình từ video lên canvas
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Trả về canvas chứa toàn bộ hình ảnh từ webcam
        return canvas;
    };


    const drawBoxes = (detections, displaySize) => {
        const ctx = webcamCanvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, displaySize.width, displaySize.height);

        detections.forEach((detection) => {
            const box = detection.detection.box;
            const label = detection.label;

            // Vẽ bounding box
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.strokeRect(box.x, box.y, box.width, box.height);

            // Vẽ label
            ctx.font = "16px Arial";
            ctx.fillStyle = "red";
            ctx.fillText(label, box.x, box.y - 5);
        });
    };

    useEffect(() => {
        const interval = setInterval(detectFaces, 1300); // Gọi hàm detect mỗi 1.300 ms
        return () => clearInterval(interval);
    }, []);

    // Handle update number of running uploading
    const handleUpdateUploading = (amount) => {
        setIsUploading(amount);
    }

    // Set course group info
    const handleFetchCourseGroupInfo = async (course_group_id) => {
        const response = await courseService.getInfoCourseGroup(course_group_id);
        setCourseGroupInfo(response.metadata);
    };
    // Add attend raw data
    const addAttendanceRawData = async (studentUsername, requestBody) => {
        const res = await attendanceService.addAttendanceRawData(requestBody);
        if (res.data.status === 201) {
            handleAddAttendListSuccess(studentUsername + ' - ' + requestBody.attendTime);
        }
    }
    // Handle attend list success
    const handleAddAttendListSuccess = (attend) => {
        setAttendListSuccess((prevArray) => [...prevArray, attend]);
    }
    // Upload attend image
    const uploadAttendImage = async (formData) => {
        try {
            const res = await attendanceService.uploadImage(formData);
            handleUpdateUploading(isUploading - 1);
            if (res.status === 201) {
                return res.data.link_anh;
            }
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    }
    const processAfterRecognition = async (canvas, label, requestBody) => {
        handleUpdateUploading(isUploading + 1);
        addAttendanceRawData(label, requestBody);

        canvas.toBlob((blob) => {
            const formData = new FormData();
            formData.append('image', blob);
            formData.append('user_id', requestBody.studentId);
            formData.append('course_group_id', requestBody.courseGroupId);
            formData.append('date', requestBody.attendDate);
            formData.append('type', requestBody.attendType);

            uploadAttendImage(formData);
        });
    }

    return (
        <main className="py-6 recogFace">
            <div className="container">
                <div className="row">
                    <div className="col-8 position-relative" style={{ height: '90vh' }}>
                        <Webcam ref={webcamRef} className="d-block"></Webcam>
                        <canvas id="webcamCanvas" ref={webcamCanvasRef} className="position-absolute top-0 left-0 z-1"></canvas>
                    </div>
                    <div className="col-4">
                        <div className="row courseGroupInfoAttend">
                            <p>Môn: <strong className='text-success'>{courseGroupInfo?.course_name}</strong> | Nhóm: {courseGroupInfo?.group_code}</p>
                            <p>Giảng viên: {courseGroupInfo?.nickname}</p>
                        </div>
                        <div className="row attendListSuccess">
                            <p className='fst-italic'>Danh sách sinh viên điểm danh thành công: </p>
                            <div className='overflow-auto mt-2 border border-info' style={{ height: '500px' }}>
                                <table className='table table-striped'>
                                    <thead>
                                        <tr>
                                            <th>MSSV</th>
                                            <th>Giờ vào lớp</th>
                                        </tr>
                                    </thead>
                                </table>
                                <AttendanceList attendListSuccess={attendListSuccess} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <canvas id="dataCanvas" ref={dataCanvasRef} hidden={true}></canvas>
        </main>
    );
}
export default React.memo(RecogFaceContent);