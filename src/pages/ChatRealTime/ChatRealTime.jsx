import React, { useEffect, useState } from "react"
import NavBar from "../../components/NavBar"
import Header from "../../components/Header"
import { useSelector } from 'react-redux';
import ChatContent from './ChatContent'
import '../../assets/css/chat.css';
export const ChatRealTime = () => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);
    const user = useSelector(state => state.auth.user);
    useEffect(() => {
        document.title = "Nhắn tin"
    }, [])

    const toggleNavBar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    };


    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
            <NavBar isNavBarVisible={isNavBarVisible} />
            <div className="h-screen flex-grow-1 recogFace">
                <Header toggleNavBar={toggleNavBar} />
                <main className="py-3">
                    <ChatContent userId={user.username} />

                </main>
            </div>

        </div>
    )
}