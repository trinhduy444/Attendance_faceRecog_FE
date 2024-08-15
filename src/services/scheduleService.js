import axiosConfig from "../utils/axiosConfig";

export const scheduleService = {
    getSchedule: async (semester_year_id) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/schedule/getSchedule', {
                semester_year_id: semester_year_id
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            });
            return response.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
    getSemesterNow: async () => {
        try {
            const response = await axiosConfig.get('/schedule/getSemesterNow', {
            }, {
            });
            return response.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
    getSemesterSomeInfo: async (semester_year_id) => {
        try {
            const response = await axiosConfig.get(`/schedule/getSemesterSomeInfo/${semester_year_id}`, {
            }, {
            });
            return response.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
};
