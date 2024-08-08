import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from '@vladmandic/face-api';
import { dateUtils } from '../../utils/dateUtils';
import { courseService } from '../../services/courseService';
import { attendanceService } from '../../services/attendanceService';

function FaceRecognitionContent() {
    const webcamRef = useRef(null);
    const webcamCanvasRef = useRef(null);
    const dataCanvasRef =  useRef(null);
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
        }
    }

    useEffect(() => {
        // Load models weight
        Promise.all([
            faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
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
            { audio: false, video: { width: 800, height: 600 } },
            (stream) => {
                webcamRef.current.srcObject = stream;
                webcamRef.current.onloadedmetadata = (e) => {
                    webcamRef.current.play();
                };
                webcamRef.current.onplay = () => {
                    setTimeout(sentFaceData, 100);
                }
            }, (err) => {
                console.error(`The following error occurred: ${err.name}`);
            }
        )
    }

    // Face recognition
    const sentFaceData = async () => {
        var ctx = dataCanvasRef.current.getContext('2d');
        dataCanvasRef.current.width = webcamRef.current.offsetWidth;
        dataCanvasRef.current.height = webcamRef.current.offsetHeight;
    
        ctx.drawImage(webcamRef.current, 0, 0, dataCanvasRef.current.width, dataCanvasRef.current.height);
    
        // Face detection
        var detections = await faceapi.detectAllFaces(dataCanvasRef.current).withFaceLandmarks().withFaceDescriptors();

        let requestBody, currDatetime, currDate, currTime;
        for (var i = 0; i < detections.length; i++) {
            // Face recognition
            const result = faceMatcher.current.findBestMatch(detections[i].descriptor);
            detections[i].detection._className = result._label;
            if (!attendedList.current.includes(result._label)) {
                attendedList.current.push(result._label);
                // Get current date and time string
                currDatetime = new Date();
                currDate = currDatetime.toISOString().split('T')[0] + 'T00:00';
                currTime = dateUtils.getTimeString(currDatetime, 'hh:mm');

                // Add attendance data to backend.
                requestBody = {
                    studentId: studentInfo.get(result._label),
                    courseGroupId: 100,
                    attendDate: currDate,
                    attendType: 0,
                    attendTime: currTime,
                    attendImagePath: ''
                }
                processAfterRecognition(dataCanvasRef.current, result._label, requestBody);
            }
        }
        // Draw face box with label
        drawFaceBox(detections);
        setTimeout(sentFaceData, 200);
    }

    // Process success face recognition
    const processAfterRecognition = async(canvas, label, requestBody) => {
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
