import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axiosConfig from "./axiosConfig";

const isAuthenticated = async () => {
    if (!localStorage.getItem('accessToken')) return false
    const accessToken = localStorage.getItem('accessToken');
    try {
        const response = await axiosConfig.post(`/auth/isLogin`, {}, {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
            withCredentials: true
        });
        if (response.status === 200) {
            return true;
        }
        return false;
    } catch (e) {
        return false;
    }
};
const isAdmin = async () => {
    if (!localStorage.getItem('accessToken')) return false
    const accessToken = localStorage.getItem('accessToken');
    try {
        const response = await axiosConfig.post(`/auth/isAdmin`, {}, {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
            withCredentials: true
        });
        if (response.status === 200) {
            return true;
        }
        return false;
    } catch (e) {
        return false;
    }
};
const isTeacher = async () => {
    if (!localStorage.getItem('accessToken')) return false
    const accessToken = localStorage.getItem('accessToken');
    try {
        const response = await axiosConfig.post(`/auth/isTeacher`, {}, {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
            withCredentials: true
        });
        if (response.status === 200) {
            return true;
        }
        return false;
    } catch (e) {
        return false;
    }
};
const isAdminOrTeacher = async () => {
    if (!localStorage.getItem('accessToken')) return false
    const accessToken = localStorage.getItem('accessToken');
    try {
        const response = await axiosConfig.post(`/auth/isAdminOrTeacher`, {}, {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
            withCredentials: true
        });
        if (response.status === 200) {
            return true;
        }
        return false;
    } catch (e) {
        return false;
    }
};
const ProtectedRoute = ({ type = 3, element }) => {
    const [isLogged, setIsLogged] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                let result;
                switch (type) {
                    case 1:
                        result = await isAdmin();
                        break;
                    case 2:
                        result = await isTeacher();
                        break;
                    case 3:
                        result = await isAuthenticated();
                        break;
                    case 4:
                        result = await isAdminOrTeacher();
                        break;
                    default:
                        result = await isAuthenticated();
                        break;
                }
                setIsLogged(result);
            } catch (error) {
                console.error("Authentication check failed:", error);
                setIsLogged(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [type]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isLogged) {
        return element;
    } else {
        return <Navigate to={type === 3 ? "/login" : "/error"} />;
    }
};

export default ProtectedRoute;