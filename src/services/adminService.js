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
    }
};
