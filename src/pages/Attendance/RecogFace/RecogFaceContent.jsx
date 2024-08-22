import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from '@vladmandic/face-api';
import { dateUtils } from '../../../utils/dateUtils';
import { userService } from '../../../services/userService';
import { courseService } from '../../../services/courseService';
import { attendanceService } from '../../../services/attendanceService';
import Swal from 'sweetalert2';
import AttendanceList from './AttendanceList';
import CountDownTimer from './CountDownTimer'
function RecogFaceContent({ course_group_id, minutes }) {
    const webcamRef = useRef(null);
    const webcamCanvasRef = useRef(null);
    const dataCanvasRef =  useRef(null);
    const faceMatcher = useRef(null);
    const attendedList = useRef(['unknown']);
    const [studentInfo, setStudentInfo] = useState(new Map());
    const [courseGroupInfo, setCourseGroupInfo] = useState(null);
    const [attendListSuccess, setAttendListSuccess] = useState([]);
    const [isUploading, setIsUploading] = useState(0);
    var faceRecog;

    // Load student face with descriptors
    const loadStudentFaceList = async (course_group_id) => {
        const response = await courseService.getCourseGroupStudentListInfo(course_group_id);
        if (response.status === 200) {
            return Promise.all(
                response.data.students.map(async (student) => {
                    setStudentInfo(studentInfo.set(student.student_username, student.student_id));
                    
                    const faces = await fetchUserFaces(student.student_id);
                    faces.push({ face_image_path: student.student_avatar_path });

                    const descriptors = [];
                    const faceImg = new Image();
                    faceImg.crossOrigin = 'Anonymous';

                    faces.forEach(async (face) => {
                        faceImg.src = face.face_image_path;
                        const faceDetection = await faceapi.detectSingleFace(faceImg).withFaceLandmarks().withFaceDescriptor();
                        descriptors.push(faceDetection.descriptor);
                    });

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
            const studentFaceList = await loadStudentFaceList(course_group_id);
            faceMatcher.current = new faceapi.FaceMatcher(studentFaceList, 0.5);
           
            handleFetchCourseGroupInfo(course_group_id);
            // Initial call for webcam
            webcamRef.current.video.onplay = () => {
                setTimeout(sentFaceData, 100);
            }
        });

        return () => {
            clearTimeout(faceRecog);
        };
    }, []);
    

    // Set course group info
    const handleFetchCourseGroupInfo = async (course_group_id) => {
        const response = await courseService.getInfoCourseGroup(course_group_id);
        setCourseGroupInfo(response.metadata);
    };

    // Get user faces
    const fetchUserFaces = async (user_id) => {
        const res = await userService.getUserFaces(user_id);
        return res.data.faces;
    }

    // Format time
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // Face recognition
    const sentFaceData = async () => {
        var ctx = dataCanvasRef.current.getContext('2d');
        dataCanvasRef.current.width = webcamRef.current.video.offsetWidth;
        dataCanvasRef.current.height = webcamRef.current.video.offsetHeight;
    
        ctx.drawImage(webcamRef.current.video, 0, 0, dataCanvasRef.current.width, dataCanvasRef.current.height);

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
                currDate = currDatetime.toISOString().split('T')[0] + 'T00:00Z';
                currTime = dateUtils.getTimeString(currDatetime, 'hh:mm');

                // Add attendance data to backend.
                requestBody = {
                    studentId: studentInfo.get(result._label),
                    courseGroupId: course_group_id,
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
        faceRecog = setTimeout(sentFaceData, 200);
    }

    // Process success face recognition
    const processAfterRecognition = async(canvas, label, requestBody) => {
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

    // Handle update number of running uploading
    const handleUpdateUploading = (amount) => {
        setIsUploading(amount);
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

    // Draw face box
    const drawFaceBox = async (data) => {
        var ctx = webcamCanvasRef.current.getContext('2d');
        webcamCanvasRef.current.width = webcamRef.current.video.offsetWidth;
        webcamCanvasRef.current.height = webcamRef.current.video.offsetHeight;
    
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
        <main className="py-6 recogFace">
            <div className="container">
                <div className="row">
                    <div className="col-8 position-relative" style={{ height: '90vh' }}>
                        <Webcam ref={webcamRef} className="d-block" style={{ width: '100%', height: '100%' }}></Webcam>
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
                               <AttendanceList attendListSuccess = {attendListSuccess}/>
                            </div>
                        </div>
                        {/* <div className="row">
                            <p className="text-danger">Thời gian còn lại: {formatTime(timeLeft)}</p>
                        </div> */}
                        <CountDownTimer minutes={minutes} ></CountDownTimer>
                    </div>
                </div>
            </div>
            <canvas id="dataCanvas" ref={dataCanvasRef} hidden={true}></canvas>
        </main>
    );
}
export default React.memo(RecogFaceContent);
