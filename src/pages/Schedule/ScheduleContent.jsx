import React, { useEffect, useState } from 'react';
import { scheduleService } from '../../services/scheduleService';
function ScheduleContent({ infoSemester }) {
    const [activitiesByDay, setActivitiesByDay] = useState([]);
    const [currentWeek, setCurrentWeek] = useState(infoSemester?.week_from);
    const daysOfWeek = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
    // Ánh xạ shift_code với chỉ số ca học
    const shiftCodeMap = {
        'ca1': 0,
        'ca2': 1,
        'ca3': 2,
        'ca4': 3,
        'ca5': 4
    };

    useEffect(() => {
        handleFetchSchedule();
    }, []);

    const handleFetchSchedule = async (week) => {
        try {
            const response = await scheduleService.getSchedule();
            const { metadata } = response;

            const activitiesByDay = daysOfWeek.map(day => ({
                day: day,
                activities: Array(5).fill(null)
            }));

            metadata.forEach(item => {
                const { week_from, week_to, exclude_week } = item;
                if (week >= week_from && week <= week_to && !exclude_week.includes(week)) {
                    const dayIndex = parseInt(item.week_day) - 2;
                    const shiftIndex = shiftCodeMap[item.shift_code];
                    if (dayIndex >= 0 && dayIndex < daysOfWeek.length && shiftIndex !== undefined) {
                        const activity = {
                            name: item.course_name,
                            time: `${item.start_time} - ${item.end_time}`,
                            instructor: `GV: ${item.nickname} | Nhóm ${item.group_code}`,
                            room: item.classroom_code
                        };
                        activitiesByDay[dayIndex].activities[shiftIndex] = activity;
                    }
                }
            });

            setActivitiesByDay(activitiesByDay);
        } catch (error) {
            console.error('Error fetching schedule:', error);
        }
    };
    useEffect(() => {
        handleFetchSchedule(currentWeek);
    }, [currentWeek]);
    const handlePreviousWeek = () => {
        if (currentWeek > 1) {
            setCurrentWeek(prevWeek => prevWeek - 1);
        }
    };

    const handleNextWeek = () => {
        setCurrentWeek(prevWeek => prevWeek + 1);
    };

    const renderRows = () => {
        const rows = [];

        for (let i = 0; i < daysOfWeek.length; i++) {
            const dayData = activitiesByDay.find(day => day.day === daysOfWeek[i]) || { activities: Array(5).fill(null) };
            const tds = [
                <td key="day" className="day">{daysOfWeek[i]}</td>
            ];
            for (let j = 0; j < 5; j++) {
                const activity = dayData.activities[j];

                if (activity) {
                    tds.push(
                        <td key={j} className="active">
                            <h5>{activity.name}</h5>
                            <p>{activity.time} | {activity.room}</p>
                            <div className="hover">
                                <h5>{activity.name}</h5>
                                <p>{activity.time} </p>
                                <i>{activity.instructor}</i>
                                <br />
                                <b>Phòng: {activity.room}</b>
                            </div>
                        </td>
                    );
                } else {
                    tds.push(<td key={j}></td>);
                }
            }
            rows.push(
                <tr key={i}>
                    {tds}
                </tr>
            );
        }
        return rows;

    };
    return (
        <main className="py-6 bg-surface-secondary">
            <div className="container">
                <div className="w-95 w-md-75 w-lg-60 w-xl-55 mx-auto mb-6 d-flex justify-content-around">
                    <div className="subtitle alt-font"
                    >
                        <i className="text-primary">Tuần {currentWeek.toString().padStart(2, '0')}</i>
                    </div>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" href="#" onClick={handlePreviousWeek}>Tuần trước</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">{currentWeek.toString().padStart(2, '0')}</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#" onClick={handleNextWeek}>Tuần tiếp</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="schedule-table">
                            <table className="table bg-white">
                                <thead>
                                    <tr>
                                        <th>Thứ/Ca</th>
                                        <th>Ca 1</th>
                                        <th>Ca 2</th>
                                        <th>Ca 3</th>
                                        <th>Ca 4</th>
                                        <th className="last">Ca 5</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderRows()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </main>

    );
}
export default React.memo(ScheduleContent);
