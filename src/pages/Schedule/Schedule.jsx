import React, { useEffect } from "react"
import NavBar from "../../components/NavBar"
import "../../assets/css/schedule.css"
export const Schedule = () => {
    useEffect(() => {
        document.title = "Thời khóa biểu"
    }, [])
    const daysOfWeek = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];

    const activitiesByDay = [
        {
            day: "Thứ 2",
            activities: [
                { name: "Lập trình hướng đối tượng", time: "6:50 - 9:15", instructor: "GV: Vũ Đình Hồng | Nhóm 01", room: "B306" },
                null,
                { name: "Kiến trúc hướng dịch vụ", time: "12:45 - 15:15", instructor: "GV: Trần Đình Phúc | Nhóm 02", room: "D301" },
                null,
                null
            ]
        },
        {
            day: "Thứ 3",
            activities: [
                null,
                { name: "Mẫu thiết kế", time: "9:30 - 12:00", instructor: "GV: Vũ Đình Hồng | Nhóm 01", room: "B402" },
                null,
                { name: "Công nghệ phần mềm", time: "15:25 - 17:55", instructor: "GV: Dzoãn Xuân Thanh | Nhóm 03", room: "C301" },
                null,
            ]
        },
        {
            day: "Thứ 6",
            activities: [
                { name: "Bóng Rổ", time: "6:50 - 9:15", instructor: "GV: Stephen Curry | Nhóm 01", room: "NTD03" },
                null,
                null,
                null,
                { name: "Phát triển Website", time: "18:05 - 20:35", instructor: "GV: Vũ Đình Hồng| Nhóm 03", room: "D607" }
            ]
        },

        // Thêm các hoạt động cho các ngày khác nếu cần
    ];

    const renderRows = () => {
        const rows = [];

        for (let i = 0; i < 7; i++) {
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
    // console.log("render notifi");
    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
            <NavBar />
            <div className="h-screen flex-grow-1 overflow-y-lg-auto">
                <header className="bg-surface-primary border-bottom pt-3">
                    <div className="container">
                        <div className="mb-npx">
                            <div className="row align-items-center">
                                <div className="col-sm-6 col-12 mb-4 mb-sm-0">
                                    <h1 className="h2 mb-0 ls-tight">
                                        Thời khóa biểu
                                    </h1>
                                </div>
                            </div>
                            <ul className="nav nav-tabs overflow-x border-0">
                                <li className="nav-item ">
                                    <a href="/" className="nav-link font-regular"><i className="bi bi-house"></i> Trang chủ</a>
                                </li>
                                <li className="nav-item ">
                                    <a href="#" className="nav-link active"><i className="bi bi-calendar2-week"></i> Thời khóa biểu</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>
                {/* <!-- Main --> */}
                <main className="py-6 bg-surface-secondary">
                    <div className="container">
                        <div className="w-95 w-md-75 w-lg-60 w-xl-55 mx-auto mb-6 d-flex justify-content-around">
                            <div className="subtitle alt-font"><i className="text-primary">Tuần 04</i><i className="title"> | Ngày 17 - 23 tháng 06</i></div>
                            <nav  aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li class="page-item"><a class="page-link" href="#">Tuần trước</a></li>
                                    <li class="page-item"><a class="page-link" href="#">04</a></li>
                                    <li class="page-item"><a class="page-link" href="#">Tuần tiếp</a></li>
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

            </div>
        </div>
    )
}