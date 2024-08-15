import React, { useEffect, useState } from "react"
import NavBar from "../../components/NavBar"
import Header from "../../components/Header"
import ScheduleContent from "./ScheduleContent"
import { courseService } from "../../services/courseService"
import { scheduleService } from "../../services/scheduleService"
import "../../assets/css/schedule.css"
export const Schedule = () => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);
    const [infoSemester, setInfoSemseter] = useState(null);
    const [allSemester, setAllSemester] = useState([]);

    useEffect(() => {
        document.title = "Thời khóa biểu"
        fetchSemeter()
    }, [])
    const toggleNavBar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    };
    const fetchSemeter = async () => {
        const response = await courseService.getAllSemester();
        if (response.status === 200) {
            setAllSemester(response.metadata)
        }
    }

    const handleFetchSemester = async (e) => {
        const response = await scheduleService.getSemesterSomeInfo(e.target.value);
        console.log(response)
        if (response.status === 200) {
            let tmp = {
                semester_year_id: response.semester_year_id,
                week_from: response.week_from,
            }
            setInfoSemseter(tmp)

        }
    }

    // console.log("render notifi");
    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
            <NavBar isNavBarVisible={isNavBarVisible} />
            <div className="h-screen flex-grow-1 ">
                <Header toggleNavBar={toggleNavBar} />
                <select
                    id="selectSemester"
                    data-live-search="true"
                    className="form-select border border-black mt-1"
                    aria-label="Default select example"
                    onChange={(e) => handleFetchSemester(e)}
                    defaultValue={allSemester.length > 0 ? allSemester[allSemester.length - 1].semester_year_id : ''}
                >
                    <option value=''>--Chọn học kỳ | Choose semester--</option>

                    {allSemester.length > 0 && allSemester.map((semester, index) => (
                        <option key={index} value={semester.semester_year_id}>
                            --- {semester.semester_year_name} ---
                        </option>
                    ))}
                </select>
                {infoSemester !== null ? (<ScheduleContent infoSemester={infoSemester} />
                ) : (null)}
            </div>
        </div>
    )
}