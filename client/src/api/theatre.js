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

export const getTheatresByOwner = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/theatres/getByOwner', payload);
        return response.data;
    } catch (error) {
        console.error('Error occurred while fetching theatres for partner', error);
        throw error;
    }
}

export const deleteTheatres = async (payload) => {
    try {
        const response = await axiosInstance.delete('/api/theatres/', {data : payload});
        return response.data;
    } catch (error) {
        console.error('Error occurred while fetching theatres for partner', error);
        throw error;
    }
}

export const addTheatre = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/theatres/', payload);
        return response.data;
    } catch (error) {
        console.error('Error occurred while adding theatres for partner', error);
        throw error;
    }
}

export const updateTheatre = async (payload) => {
    try {
        const response = await axiosInstance.put('/api/theatres/update', payload);
        return response.data;
    } catch (error) {
        console.error('Error occurred while adding theatres for partner', error);
        throw error;
    }
}