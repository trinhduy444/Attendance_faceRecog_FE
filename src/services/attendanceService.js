import axiosConfig from "../utils/axiosConfig";

export const attendanceService = {
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

}