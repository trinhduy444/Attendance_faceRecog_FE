import { useNavigate } from 'react-router-dom';

const useErrorHandler = () => {
    const navigate = useNavigate();

    return (error) => {
        navigate('/error', { state: { status: 500, message: error.message } });
    };
};

export default useErrorHandler;
