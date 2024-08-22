import axiosConfig from "../utils/axiosConfig";

export const authService = {
    login: async (username, password) => {
        try {
            const response = await axiosConfig.post('/auth/login', {
                username: username,
                password: password,
            });
            // console.log("o service", response.data);
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
        axiosConfig.get(`/auth/google/callback?code=${code}`)
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
    logout: async () => {
        const accessToken = localStorage.getItem('accessToken');
        return await axiosConfig.post('/auth/logout', {}, {
            headers: { 'Authorization': 'Bearer ' + accessToken }
        }).then(response => {
            if (response.data.status === 200) {
                localStorage.clear()
                return response.data;
            }
            return response.data;
        }).catch(error => {
            console.error('Error during', error);
        });
    },
    checkPassword: async (password) => {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axiosConfig.post('/auth/checkPassword', {
            'password': password
        }, {
            headers: { 'Authorization': 'Bearer ' + accessToken }
        });
        return response.data;

    },
    changePassword: async (newPassword) => {
        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await axiosConfig.put('/auth/changePassword', {
                'newPassword': newPassword
            }, {
                headers: { 'Authorization': 'Bearer ' + accessToken }
            });
            return response.data;
        } catch (error) {
            console.error('Error during changePassword:', error);
            throw error;
        }
    },
    refreshAccessToken: async () =>{
        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await axiosConfig.post('/auth/refreshAccessToken', {}, {
                headers: { 'Authorization': 'Bearer ' + accessToken }
            });
            return response;
        } catch (error) {
            console.error('Error during refreshAccessToken:', error);
            throw error;
        }
    }
}