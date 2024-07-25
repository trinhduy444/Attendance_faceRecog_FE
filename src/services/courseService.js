import axiosConfig from "../utils/axiosConfig";

export const courseService = {
    getCourseFilter: async (requestBody) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/courses/getCourseFilter', JSON.stringify(requestBody), {
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
    createCourseGroup: async (requestBody) => {
        console.log("haha",JSON.stringify(requestBody));
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/courses/createCourseGroup', JSON.stringify(requestBody), {
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

};
