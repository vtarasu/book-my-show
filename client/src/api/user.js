const {axiosInstance} = require('.');

export const registerUser = async (userData) => {
    try {
        console.log('Registering user with data:', userData);
        const response = await axiosInstance.post('/api/users/register', userData);
        console.log('User registered successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

export const loginUser = async (credentials) => {
    try {
        console.log('Logging in with credentials:', credentials);
        const response = await axiosInstance.post('/api/users/login', credentials);
        console.log('User logged in successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

export const currentUser = async () => {
    try {
        const response = await axiosInstance.post('/api/users/current-user');
        console.log('Fetching user:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
}