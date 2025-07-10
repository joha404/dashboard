// Helper function for consistent error handling
export const handleServiceError = (error, defaultMessage = 'Operation failed') => {
    const errorMessage = error.response?.data?.message ||
        error.message ||
        defaultMessage;

    // Log detailed error for debugging
    console.error('Service Error:', {
        message: errorMessage,
        code: error.response?.status,
        data: error.response?.data,
        stack: error.stack
    });

    throw new Error(errorMessage);
};