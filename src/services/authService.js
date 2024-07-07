import axiosConfig from "../utils/axiosConfig";

export const authService = {
    login: async (username, password) => {
        try {
            const response = await axiosConfig.post('/auth/login', {
                username: username,
                password: password,
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    },
    loginGoogle: async () => {
        try {
            console.log("Entryy")
            const response = await axiosConfig.get('/auth/google', { withCredentials: true });
            console.log(response);
            return response.data;
        } catch (error) {
            return console.error(error);
        }
    },
    callBackGoogle: async (code) => {
        axiosConfig.get(`http://localhost:5000/api/v1/auth/google/callback?code=${code}`)
            .then(response => {
                const { token, user } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                window.location.href = '/';
            })
            .catch(error => {
                console.error('Error during Google login:', error);
            });
    },

}