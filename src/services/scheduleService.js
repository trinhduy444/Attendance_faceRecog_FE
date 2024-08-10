import axiosConfig from "../utils/axiosConfig";

export const scheduleService = {
    getSchedule: async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/schedule/getSchedule', {}, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });
            return response.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
};
