import axiosConfig from "../utils/axiosConfig";

export const requestService = {
    createAttendanceRequest: async (requestBody) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/requests/', JSON.stringify(requestBody), {
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

    getAllRequestsByActiveUser: async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.get('/requests/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                withCredentials: true
            });
            return response.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
};