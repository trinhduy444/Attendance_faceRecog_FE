import React, { useEffect, useState } from "react"
import Swal from "sweetalert2"
import NavBar from "../../components/NavBar"
import Header from "../../components/Header"
import AttendanceRequestContent from "./AttendanceRequestContent"
import FilterAttendanceRequest from "./FilterAttendanceRequest"
import { attendanceService } from "../../services/attendanceService"
import { requestService } from "../../services/requestService"

export const AttendanceRequest = () => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);
    const [attendanceRequests, setAttendanceRequests] = useState([])
    const [filteredAttendanceRequests, setFilteredAttendanceRequests] = useState([]);

    useEffect(() => {
        document.title = "Yêu cầu điểm danh";
        fetchAttendanceRequests();
    }, [])

    const toggleNavBar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    };
    const fetchAttendanceRequests = async () => {
        const response = await requestService.getAllRequestsByActiveUser();
        if (response.status === 200) {
            setAttendanceRequests(response.data)
            setFilteredAttendanceRequests(response.data)
        } else {
            Swal.fire("Lỗi!", "Không thể lấy dữ liệu các thông báo!", 'error')
            return;
        }
    }
    const handleFilter = (filteredData) => {
        setFilteredAttendanceRequests(filteredData);
    };

    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
            <NavBar isNavBarVisible={isNavBarVisible} />
            <div className="h-screen flex-grow-1">
                <Header toggleNavBar={toggleNavBar} />
                <main className="py-6 bg-surface-secondary">
                    <div className="container">
                        {/* <FilterAttendanceRequest attendanceRequests={attendanceRequests} onFilter={handleFilter} /> */}
                        <AttendanceRequestContent attendanceRequests={filteredAttendanceRequests.length > 0 ? filteredAttendanceRequests : attendanceRequests} />
                    </div>
                </main>
            </div>
        </div>
    )
}