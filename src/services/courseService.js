import axiosConfig from "../utils/axiosConfig";

export const courseService = {
    getCourseFilter: async (requestBody) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/courses/getCourseFilter', JSON.stringify(requestBody), {
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

    getCourseGroupStudentListInfo: async (course_group_id) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.get(`/courses/groups/students/${course_group_id}`, {
                headers: {
                    'Content-Type': 'application/json',
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

    createCourseGroup: async (requestBody) => {
        // console.log("haha",JSON.stringify(requestBody));
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/courses/createCourseGroup', JSON.stringify(requestBody), {
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
    getCourseGroupTeacher: async (semester_year_id) => {
        let url = ``;
        if (semester_year_id) {
            url = `/courses/getCourseGroupByTeacher/?semester_year_id=${semester_year_id}`
        } else {
            url = `/courses/getCourseGroupByTeacher`
        }
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post(url, {}, {
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
    getCourseGroupStudent: async (semester_year_id, course_group_id) => {
        // console.log("fe",semester_year_id, course_group_id)
        let url = ``;
        if (semester_year_id) {
            url = `/courses/getCourseGroupByStudent/?semester_year_id=${semester_year_id}`
        } else {
            url = `/courses/getCourseGroupByStudent`
        }
        let body;
        if (course_group_id) {
            body = {
                'course_group_id': course_group_id
            }
        }
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post(url, body, {
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

    getInfoCourseGroup: async (course_group_id) => {
        try {
            const response = await axiosConfig.get(`/courses/getInfoCourseGroup/${course_group_id}`);
            return response.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
    checkAccessCourseGroup: async (course_group_id) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post(`/courses/checkAccessCourseGroup/${course_group_id}`, {}, {
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
    getAllCourseGroupActive: async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post(`/courses/getAllCourseGroupActive`, {}, {
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
    getAllCourseGroup: async (semester_year_id) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            let url = ``;
            if (semester_year_id) {
                url = `/courses/getAllCourseGroup/?semester_year_id=${semester_year_id}`
            } else {
                url = `/courses/getAllCourseGroup`
            }
            const response = await axiosConfig.post(url, {}, {
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
    getAllSemester: async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/courses/getAllSemesters', {}, {
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
    createCourseGroups: async (data) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/courses/createCourseGroups', { courseGroups: data }, {
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
    createstudentLists: async (data) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/courses/createStudentLists', { studentLists: data }, {
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
    viewAllStudentCourseGroup: async (status, teacher_id, course_group_id) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.get('/courses/viewAllStudentCourseGroup', {
                params: {
                    status: status,
                    teacher_id: teacher_id,
                    course_group_id: course_group_id
                },
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
    viewAllStudentCourseGroupByTeacher: async (status, course_group_id) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.get('/courses/viewAllStudentCourseGroupByTeacher', {
                params: {
                    status: status,
                    course_group_id: course_group_id
                },
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
};
