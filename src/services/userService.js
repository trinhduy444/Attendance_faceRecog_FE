import axiosConfig from "../utils/axiosConfig";

export const userService = {
    getProfile: async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/users/profile', {}, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + accessToken
                }
            });
            return response.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
    getImageAndNicknameByUsername: async (username) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/users/getImageAndNicknameByUsername', {
                username: username
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
    checkExistUser: async (username) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/users/checkExistUser', {
                username: username
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
    }
};
