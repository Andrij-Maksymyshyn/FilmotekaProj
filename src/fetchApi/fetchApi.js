import axios from 'axios';

const API_KEY = '3b94c1b54af7d429587ecf26a37007c0';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchTrendCollection() {
    return await axios.get(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
    };

export async function fetchMovieByKeyWord(value) {
    return await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${value}&include_adult=false`);
};

export async function fetchMovieById(movieId) {
  return await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);  
};
