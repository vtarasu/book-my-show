const {axiosInstance} = require('.');

export const registerUser = async (userData) => {
    try {
        const response = await axiosInstance.post('/api/users/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

export const loginUser = async (credentials) => {
    try {
        const response = await axiosInstance.post('/api/users/login', credentials);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

export const currentUser = async () => {
    try {
        const response = await axiosInstance.post('/api/users/current-user');
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
}