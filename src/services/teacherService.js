import axiosConfig from "../utils/axiosConfig";

export const teacherService = {
    sendMail: async (course_group_id,mailContent) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/teacher/sendMail', {
                course_group_id: course_group_id,
                mailContent
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
};
