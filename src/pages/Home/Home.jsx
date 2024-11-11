import React, { useEffect, useState } from "react";

import NavBar from "../../components/NavBar";
import NavBarToggle from "../../components/NavBarToggle";
import HomeContent from "./HomeContent";
import "../../assets/css/home.css";
import sclogo from "../../assets/images/sclogo.jpg";

export const Home = () => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(true);
    useEffect(() => {
        document.title = "Trang chủ";
    }, []);

    const toggleNavBar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    };

    // console.log("Home")
    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary" >
            <NavBar isNavBarVisible={isNavBarVisible} />
            <div className="h-screen flex-grow-1">
                <header className="bg-surface-primary border-bottom pt-3">
                    <div className="container">
                        <div className="mb-npx">
                            <div className="row align-items-center">
                                <div className="col-sm-6 col-12 mb-4 mb-sm-0">
                                    <h1 className="h2 mb-0 ls-tight" id="nameUni">
                                        <NavBarToggle toggleNavBar={toggleNavBar} /> ĐẠI HỌC TÔN ĐỨC THẮNG
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <HomeContent />
            </div>
        </div >
    )
}