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

export const deleteMovie = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/movies/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting movie:', error);
        throw error;
    }
}

export const addMovie = async (movieData) => {
    try {
        const response = await axiosInstance.post('/api/movies/add', movieData);
        return {success: true, date : response.data};
    } catch (error) {
        console.error('Error adding movie:', error);
        throw error;
    }
}

export const updateMovie = async (id, movieData) => {
    try {
        const response = await axiosInstance.put(`/api/movies/${id}`, movieData);
        return {success: true, date : response.data};
    } catch (error) {
        console.error('Error updating movie:', error);
        throw error;
    }
}