import axiosConfig from "../utils/axiosConfig";

export const commentService = {

    createComment: async (requestBody) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/comment/createComment', JSON.stringify(requestBody), {
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
    getAllComments: async (post_id) => {
        try {
            const response = await axiosConfig.get(`/comment/getAllComments/${post_id}`);
            return response.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }



};
