import React, { useEffect, useState } from "react"
import NavBar from "../../components/NavBar"
import Header from "../../components/Header"
import FaceRecognitionContent from "./FaceRecognitionContent"
import { useSelector } from 'react-redux';

export const FaceRecognition = () => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);
    const user = useSelector(state => state.auth.user);
    useEffect(() => {
        document.title = "Điểm danh"
    }, [])
    const toggleNavBar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    };
    // console.log("render notifi");
    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
            <NavBar isNavBarVisible={isNavBarVisible} />
            <div className="h-screen flex-grow-1">
                <Header toggleNavBar={toggleNavBar} />
                <FaceRecognitionContent role={user.role_id} />
            </div>
        </div>
    )
}