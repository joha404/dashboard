// src/components/ProtectedRoute.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../providers/AuthProvider.jsx";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate('/login', { replace: true });
        }
    }, [isAuthenticated, loading, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : null;
};

export default ProtectedRoute;