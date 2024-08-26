import axiosConfig from "../utils/axiosConfig";

export const adminService = {
    getAllUsers: async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/admin/getUsers', {}, {
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
    getAllAdministrators: async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/admin/getAllAdmins', {}, {
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
    getAllUsersDetail: async (requestBody) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/admin/getUsersDetail', JSON.stringify(requestBody), {
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
    createAdmin: async (requestBody) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/admin/createAdmin', JSON.stringify(requestBody), {
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
    getCourseFilter: async (requestBody) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/admin/getUsersDetail', JSON.stringify(requestBody), {
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
    getAllTeachers: async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/admin/getTeachers', {}, {
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
    getAllTeachersByFaculty: async (faculty_id) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post(`/admin/getAllTeachersByFaculty/${faculty_id}`, {}, {
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
    createUsers: async (data) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/admin/createUsers', { users: data }, {
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
    createTeachers: async (data) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/admin/createTeachers', {
                teachers: data
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },
                withCredentials: true
            });
            return response.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
    uploadImage: async (formData) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/admin/uploadimage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + accessToken
                }
            });
            return response;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
    uploadImages: async (formData) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/admin/uploadimages', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + accessToken
                }
            });
            return response;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
    lockAccount: async (userId) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.put(`/admin/lockAccount/${userId}`, {}, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });
            return response;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
    unLockAccount: async (userId) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.put(`/admin/unLockAccount/${userId}`, {}, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });
            return response;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
    lockUserAccount: async (userId, role_id) => {
        console.log(userId, role_id);

        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.put(`/admin/lockUserAccount/${userId}/${role_id}`, {}, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });
            return response;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
    unLockUserAccount: async (userId, role_id) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.put(`/admin/unLocUserkAccount/${userId}/${role_id}`, {}, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });
            return response;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
};
