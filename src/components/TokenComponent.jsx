import { useEffect } from 'react';
import { authService } from '../services/authService';

const TokenManager = () => {
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const response = await authService.refreshAccessToken();
                if (response.status === 200) {
                    localStorage.setItem('accessToken', response.data.newAT);
                    console.log('Token refreshed successfully');
                }
            } catch (err) {
                console.error('Failed to refresh token', err);
                clearInterval(interval);
            }
        }, 9 * 60 * 1000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return null; // Component này không cần render UI
};

export default TokenManager;
