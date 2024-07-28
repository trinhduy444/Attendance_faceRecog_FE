import axiosConfig from "../utils/axiosConfig";

export const postService = {

    createPost: async (course_group_id, requestBody) => {
        // console.log("haha",JSON.stringify(requestBody));
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post(`/post/createPost/${course_group_id}`, JSON.stringify(requestBody), {
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
    getAllPostValid: async (course_group_id) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post(`/post/getAllPostValid/${course_group_id}`, {}, {
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
    setPostInvalid: async (post_id) => {
        try {
            const accessToken = localStorage.getItem('accessToken');

            const response = await axiosConfig.put(`/post/deletePost/${post_id}`, {}, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                },
                withCredentials: true
            });
            return response.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
    updatePost: async (post_id, requestBody) => {
        // console.log("haha",JSON.stringify(requestBody));
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.patch(`/post/updatePost/${post_id}`, JSON.stringify(requestBody), {
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
