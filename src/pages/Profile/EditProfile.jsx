import React, { useEffect, useState } from "react"
import NavBar from "../../components/NavBar"
import EditProfileContent from "./EditProfileContent";
export const EditProfile = () => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(true);
    useEffect(() => {
        document.title = "Chỉnh sửa thông tin cá nhân"
    }, [])
    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary" >
            <NavBar isNavBarVisible={isNavBarVisible} />
            <div className="container-xl overflow-y-auto ">
                <hr className="mt-0 mb-4" />
                <EditProfileContent />

            </div>
        </div>
    )
}