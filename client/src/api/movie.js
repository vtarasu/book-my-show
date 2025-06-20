const {axiosInstance} = require('.');

export const getAllMovies = async () => {
    try {
        const response = await axiosInstance.get('/api/movies');
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}