import axiosConfig from "../utils/axiosConfig";

export const attendanceService = {
    addAttendanceRawData: async (requestBody) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/attendances/raw', JSON.stringify(requestBody), {
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
    }
};