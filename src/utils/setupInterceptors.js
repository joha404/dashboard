// src/api/interceptor.js
import axios from 'axios';

const setupInterceptors = (store) => {
    axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            // If error is 401 (Unauthorized) and we haven't already retried
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    // Attempt to refresh token
                    const response = await axios.post('/auth/refresh-token');
                    // Retry the original request with new token
                    return axios(originalRequest);
                } catch (refreshError) {
                    // If refresh fails, logout the user
                    if (store) {
                        await logout();
                    }
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );
};

export default setupInterceptors;