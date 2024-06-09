import axiosConfig from "../utils/axiosConfig";

export const authService = {
    login: async (username,password) => {
        try {
            const response = await axiosConfig.post('/auth/login', {
                username: username,
                password: password,
            });
            
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

}