import React, { useEffect, useState } from 'react';
import { courseService } from '../../../services/courseService';
import { attendanceService } from '../../../services/attendanceService';
import AttendanceTable from './AttendanceTable'
import Swal from 'sweetalert2';
function AttendanceManagementContent2({ course_group_id }) {

    const [attendanceData, setAttendanceData] = useState([]);

    useEffect(() => {
        fetchAttendanceInfo(course_group_id)
    }, []);

    const fetchAttendanceInfo = async (courseGroupId) => {
        const response = await attendanceService.getAttendance(courseGroupId, '');
        const formatData = formatAttendance(response.data.data)
        setAttendanceData(formatData)
        console.log("DAta da lây", formatData);

    };
    function formatAttendance(data) {
        const groupedData = data.reduce((result, item) => {
            if (!result[item.username]) {
                result[item.username] = {
                    student_id: item.student_id,
                    username: item.username,
                    nickname: item.nickname,
                    course_code: item.course_code,
                    course_name: item.course_name,
                    ban_yn: item.ban_yn,
                    attendances: []
                };
            }

            // Thêm các thông tin điểm danh vào attendances
            result[item.username].attendances.push({
                attend_yn: item.attend_yn,
                late_yn: item.late_yn,
                note: item.note,
                attend_date: item.attend_date,
                attend_date_dmy: item.attend_date_dmy,
                attend_image_path: item.attend_image_path,
                enter_time: item.enter_time
            });

            return result;
        }, {});

        // Chuyển kết quả từ object về mảng
        return Object.values(groupedData);
    }
    return (
        <main className="py-2 bg-surface-secondary p-5"  id='top'>
            <hr className='text-black' />
            {attendanceData.length > 0 ? (<AttendanceTable data={attendanceData} courseGroupId={course_group_id} />
            ) : null}
            <a href="#top" className='bi bi-align-top btn btn-outline-primary mt-2'>Lên đầu trang</a>

        </main >

    );
}
export default React.memo(AttendanceManagementContent2);
