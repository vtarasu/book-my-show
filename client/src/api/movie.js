const {axiosInstance} = require('.');

export const getMovies = async () => {
    try {
        console.log('Fetching movies from the server');
        const response = await axiosInstance.get('/api/movies');
        console.log('Movies fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}