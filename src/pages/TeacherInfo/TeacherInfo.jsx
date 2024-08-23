import React, { useEffect, useState } from "react"
import NavBar from "../../components/NavBar"
import Header from "../../components/Header"
import { useNavigate } from "react-router-dom"
import TeacherInfoContent from "./TeacherInfoContent"
import { teacherService } from "../../services/teacherService"
export const TeacherInfo = () => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);
    const navigate = useNavigate()
    const [teacherData, setTeacherData] = useState([])
    const [facultyData, setFacultyData] = useState(null)
    useEffect(() => {
        document.title = "Giảng viên"
        fetchAllTeacherByYourFaculty()
    }, [])
    const toggleNavBar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    };
    const fetchAllTeacherByYourFaculty = async () => {
        try{
            const response = await teacherService.getAllTeachersByFacultyId()
            if (response.status === 200) {
                setTeacherData(response.teachers)
                setFacultyData(response.faculty)
            } else {
                navigate("/error")
            }
        }catch(err){
            navigate("/error",{
                state: { status: err.reponse?.status || 500, message: err.message }
            })
        }
    }
    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
            <NavBar isNavBarVisible={isNavBarVisible} />
            <div className="h-screen flex-grow-1 ">
                <Header toggleNavBar={toggleNavBar} />
                {teacherData.length > 0 ? (<TeacherInfoContent teacherData={teacherData} facultyData={facultyData} />
                ) : (<div> <h3>Chưa tìm thấy dữ liệu!</h3> </div>)}
            </div>
        </div >
    )
}