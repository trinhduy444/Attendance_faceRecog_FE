const initialState = {
    isAuthenticated: false,
    user: {},
    refreshToken: '',
    isLoading: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                isLoading: true,
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                refreshToken: action.payload.refreshToken,
                isLoading: false,
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                isLoading: false,
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};

export default authReducer;
