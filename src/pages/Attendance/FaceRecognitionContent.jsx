import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from '@vladmandic/face-api';
import { dateUtils } from '../../utils/dateUtils';
import { courseService } from '../../services/courseService';
import { attendanceService } from '../../services/attendanceService';
import Swal from 'sweetalert2';

function FaceRecognitionContent() {
    const recognitionCounter = useRef(new Map());
    const recognitionStartTime = useRef(new Map());

    const webcamRef = useRef(null);
    const webcamCanvasRef = useRef(null);
    const dataCanvasRef = useRef(null);
    const faceMatcher = useRef(null);
    const attendedList = useRef(['unknown']);
    const [studentInfo, setStudentInfo] = useState(new Map());
    const [attendSuccess, setAttendSuccess] = useState([]);

    // Load student face with descriptors
    const loadStudentFaceList = async (course_group_id) => {
        const response = await courseService.getCourseGroupStudentListInfo(course_group_id);
        if (response.status === 200) {
            return Promise.all(
                response.data.students.map(async (student) => {
                    setStudentInfo(studentInfo.set(student.student_username, student.student_id));
                    const descriptors = [];
                    const faceImg = new Image();
                    faceImg.crossOrigin = 'Anonymous';
                    faceImg.src = student.student_avatar_path;

                    const faceDetection = await faceapi.detectSingleFace(faceImg).withFaceLandmarks().withFaceDescriptor();

                    descriptors.push(faceDetection.descriptor);

                    return new faceapi.LabeledFaceDescriptors(student.student_username, descriptors);
                })
            );
        } else {
            Swal.fire("Thất bại!", "Có lỗi khi tải dữ liệu khuôn mặt, vui lòng thử lại!", "error")
            return
        }
    }

    useEffect(() => {
        // Load models weight
        Promise.all([
            faceapi.nets.mtcnn.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models')
        ]).then(async () => {
            const studentFaceList = await loadStudentFaceList(100);
            faceMatcher.current = new faceapi.FaceMatcher(studentFaceList, 0.5);

            // Initial call for webcam
            requestWebcam();
        });
    }, []);

    // Request webcam access
    const requestWebcam = async () => {
        navigator.getUserMedia(
            {
                audio: false,
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            },
            (stream) => {
                webcamRef.current.srcObject = stream;
                webcamRef.current.onloadedmetadata = (e) => {
                    webcamRef.current.play();
                };
                webcamRef.current.onplay = () => {
                    setTimeout(sentFaceData, 1000); // Tăng thời gian chờ
                };
            },
            (err) => {
                console.error(`The following error occurred: ${err.name}`);
            }
        );
    };


    // Face recognition
    const sentFaceData = async () => {
        const ctx = dataCanvasRef.current.getContext('2d');
        dataCanvasRef.current.width = webcamRef.current.offsetWidth;
        dataCanvasRef.current.height = webcamRef.current.offsetHeight;

        ctx.drawImage(webcamRef.current, 0, 0, dataCanvasRef.current.width, dataCanvasRef.current.height);

        const detections = await faceapi
            .detectAllFaces(dataCanvasRef.current)
            .withFaceLandmarks()
            .withFaceDescriptors();

        const timeThreshold = 1500; // Thời gian xác nhận (1.5 giây)
        const distanceThreshold = 0.6; // Ngưỡng độ tin cậy

        const currentTime = Date.now(); // Thời gian hiện tại

        for (const detection of detections) {
            const landmarks = detection.landmarks;

            if (isFaceStraight(landmarks)) {
                const result = faceMatcher.current.findBestMatch(detection.descriptor);

                if (result.distance < distanceThreshold) {
                    const label = result.label;

                    if (!attendedList.current.includes(label)) {
                        const startTime = recognitionStartTime.current.get(label) || currentTime;
                        recognitionStartTime.current.set(label, startTime);

                        // Nếu đã nhận diện liên tục quá ngưỡng thời gian
                        if (currentTime - startTime >= timeThreshold) {
                            attendedList.current.push(label);

                            const currDatetime = new Date();
                            const currDate = currDatetime.toISOString().split('T')[0] + 'T00:00';
                            const currTime = dateUtils.getTimeString(currDatetime, 'hh:mm');

                            const requestBody = {
                                studentId: studentInfo.get(label),
                                courseGroupId: 100,
                                attendDate: currDate,
                                attendType: 0,
                                attendTime: currTime,
                                attendImagePath: ''
                            };

                            processAfterRecognition(dataCanvasRef.current, label, requestBody);

                            recognitionCounter.current.delete(label);
                            recognitionStartTime.current.delete(label);
                        }
                    }
                }
            } else {
                console.warn('Face angle too large, skipping recognition');
            }
        }

        // Xóa khuôn mặt không còn nhận diện
        Array.from(recognitionStartTime.current.keys()).forEach((label) => {
            if (!detections.some((detection) => faceMatcher.current.findBestMatch(detection.descriptor).label === label)) {
                recognitionStartTime.current.delete(label);
            }
        });

        drawFaceBox(detections);
        setTimeout(sentFaceData, 1000); // Lặp lại mỗi giây
    };

    const isFaceStraight = (landmarks) => {
        const leftEye = landmarks.getLeftEye();
        const rightEye = landmarks.getRightEye();

        const eyeMidpoint = {
            x: (leftEye[0].x + rightEye[3].x) / 2,
            y: (leftEye[0].y + rightEye[3].y) / 2
        };

        const nose = landmarks.getNose();
        const noseTip = nose[6]; // Điểm đầu mũi

        // Tính khoảng cách ngang và dọc
        const dx = Math.abs(noseTip.x - eyeMidpoint.x);
        const dy = Math.abs(noseTip.y - eyeMidpoint.y);

        // Tính tỷ lệ góc nghiêng
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        return angle <= 30; // Chỉ nhận diện nếu góc nghiêng <= 30 độ
    };

    // Process success face recognition
    const processAfterRecognition = async (canvas, label, requestBody) => {
        canvas.toBlob(async (blob) => {
            const formData = new FormData();
            formData.append('image', blob);
            formData.append('user_id', requestBody.studentId);
            formData.append('course_group_id', requestBody.courseGroupId);
            formData.append('date', requestBody.attendDate);
            formData.append('type', requestBody.attendType);

            requestBody.attendImagePath = await uploadAttendImage(formData);
            addAttendanceRawData(label, requestBody);
        });
    }

    // Add attend raw data
    const addAttendanceRawData = async (studentUsername, requestBody) => {
        const res = await attendanceService.addAttendanceRawData(requestBody);
        if (res.data.status === 201) {
            setAttendSuccess([...attendSuccess, studentUsername + ' - ' + requestBody.attendTime]);
        }
    }

    // Upload attend image
    const uploadAttendImage = async (formData) => {
        try {
            const res = await attendanceService.uploadImage(formData);
            if (res.status === 201) {
                return res.data.link_anh;
            }
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    }

    // Draw face box
    const drawFaceBox = async (data) => {
        var ctx = webcamCanvasRef.current.getContext('2d');
        webcamCanvasRef.current.width = webcamRef.current.offsetWidth;
        webcamCanvasRef.current.height = webcamRef.current.offsetHeight;

        data.forEach((face) => {
            var { _x, _y, _width, _height } = face.detection._box;
            // Draw rectangle
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'red';
            ctx.strokeRect(_x, _y, _width, _height);

            // Draw face description
            ctx.font = "30px Arial";
            ctx.fillStyle = 'red';
            ctx.fillText(face.detection._className, _x, _y - 10);
        });
    }

    return (
        <main className="py-6 bg-surface-secondary">
            <div className="container">
                <div className="row">
                    <div className="col-6 position-relative">
                        <video id="webcam" ref={webcamRef} className="d-block" autoPlay={true}></video>
                        <canvas id="webcamCanvas" ref={webcamCanvasRef} className="position-absolute top-0 left-0 z-1"></canvas>
                    </div>
                    <div className="col-6">
                        <div className="card-header">
                            <h3>Điểm danh</h3>
                        </div>
                        <div className="card-body">
                            <ul>
                                {attendSuccess.length > 0 && attendSuccess.map((attend, index) => (
                                    <li key={index}>{attend}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <canvas id="dataCanvas" ref={dataCanvasRef} hidden={true}></canvas>
        </main>
    );
}
export default React.memo(FaceRecognitionContent);
