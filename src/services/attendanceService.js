import { data } from "jquery";
import axiosConfig from "../utils/axiosConfig";

export const attendanceService = {
    addAttendanceRawData: async (requestBody) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/attendances/rawserverdatetime', JSON.stringify(requestBody), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                withCredentials: true
            });
            return response;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    uploadImage: async (formData) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/attendances/uploadimage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + accessToken
                }
            });
            return response;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    updateAttendanceFromRawData: async (requestBody) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/attendances/pulldata', JSON.stringify(requestBody), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                withCredentials: true
            });
            return response;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
  
    getAttendance: async (courseGroupId, attendDate) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.get(`/attendances`, {
                params: {
                    courseGroupId: courseGroupId,
                    attendDate: attendDate
                },
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                },
                withCredentials: true
            });
            return response;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    updateAttendance: async (requestBody) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.put('/attendances', JSON.stringify(requestBody), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                withCredentials: true
            });
            return response;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    deleteAttendance: async (requestBody) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.delete('/attendances', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                data: JSON.stringify(requestBody),
                withCredentials: true
            });
            return response;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
};