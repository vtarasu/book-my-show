const {axiosInstance} = require('.');

export const getAllTheatres = async () => {
    try {
        const response = await axiosInstance.get('/api/theatres');
        return response;
    } catch (error) {
        console.error('Error fetching theatres:', error);
        throw error;
    }
}

export const updateTheatreStatus = async (payload) => {
    try {
        const response = await axiosInstance.put('/api/theatres/update', payload);
        return response;
    } catch(error) {
        console.error('Error updating theatre status:', error);
        throw error;
    }
}