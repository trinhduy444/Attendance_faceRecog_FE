import axiosConfig from "../utils/axiosConfig";

export const notifyService = {
    createNotify: async (requestBody) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/notify/createNotification', JSON.stringify(requestBody), {
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
    getAllNotifications: async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/notify/getAllNotifications', {}, {
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
    getAllNotificationsActiveByUser: async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/notify/getAllNotificationsActiveByUser', {}, {
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
    hideNotification: async (notify_id) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.put(`/notify/hideNotifications/${notify_id}`, {}, {
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
    showNotification: async (notify_id) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.put(`/notify/showNotifications/${notify_id}`, {}, {
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
    viewNotification: async (notify_id) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.put(`/notify/viewNotification/${notify_id}`, {}, {
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
    }
}