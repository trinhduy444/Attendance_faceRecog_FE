export const isAuthenticated = () => {
    return !!localStorage.getItem('accessToken');
    // return true;
};