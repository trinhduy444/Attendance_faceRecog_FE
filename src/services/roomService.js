import axiosConfig from "../utils/axiosConfig";

export const roomService = {
    createRoom: async (data) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/classroom/createClassRoom', {
                "building": data.building,
                "classroom": data.roomNumber,
                "capacity": data.capacity,
                "floor": data.floor,
                "description": data.description,
                status: 0
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
    createRooms: async (data) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post('/classroom/createClassRooms', {
                rooms: data
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
    getRooms: async (limit, skip) => {
        try {
            const accessToken = localStorage.getItem('accessToken');

            const response = await axiosConfig.post(`/classroom/getRooms?limit=${limit}&skip=${skip}`, {}, {
                headers: {
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
    getAllRooms: async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');

            const response = await axiosConfig.post(`/classroom/getAllRooms`, {}, {
                headers: {
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
    getRoomsFilter: async (requestBody) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post(`/classroom/getClassRoomsFilter`, JSON.stringify(requestBody), {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            return response.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
    getShiftEmpty: async (classroom_code) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosConfig.post(`/classroom/getShiftEmpty?classroom=${classroom_code}`, {}, {
                headers: {
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
};
