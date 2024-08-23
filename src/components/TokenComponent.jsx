import { useEffect } from 'react';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';
const TokenManager = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const response = await authService.refreshAccessToken();
                if (response.status === 200) {
                    localStorage.setItem('accessToken', response.data.newAT);
                    console.log('Token refreshed successfully');
                }
            } catch (err) {
                clearInterval(interval);
                navigate("/error", {
                    state: { status: err.response.status || 500, message: 'Failed to refresh token' }
                })
            }
        }, 9 * 60 * 1000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return null; // Component này không cần render UI
};

export default TokenManager;
