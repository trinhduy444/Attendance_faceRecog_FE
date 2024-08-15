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

    getAttendance: async (courseGroupId, attendDate) => {
        // console.log('getAttendance', courseGroupId, attendDate);
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
    getAttendanceDetail: async (studentId,courseGroupId, attendDate) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.get(`/attendances/detail`, {
                params: {
                    studentId: studentId,
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
    getAttendanceHaveUserId: async (studentId, courseGroupId) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.get(`/attendances`, {
                params: {
                    studentId: studentId,
                    courseGroupId: courseGroupId
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
    }
};