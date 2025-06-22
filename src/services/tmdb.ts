
import axios from 'axios';
import { Movie } from '../../types/movie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_BASE_URL,
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
  },
  timeout: 5000,
});

export const fetchPopularMovies = async (): Promise<Movie[]> => {
  try {
    const { data } = await api.get('/movie/popular');
    return data.results || [];
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

// Similar error handling for other API functions...

export const getImageUrl = (path: string | null, size = 'w500') => {
  return path 
    ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/${size}${path}`
    : '/placeholder-movie.jpg';
};

export const searchMovies = async (query: string) => {
  const response = await api.get('/search/movie', {
    params: {
      query,
    },
  });
  return response.data.results;
};

 export const getMovieDetails = async (id: string) => {
  const response = await api.get(`/movie/${id}`, {
    params: {
      append_to_response: 'videos,credits',
    },
  });
  return response.data;
};

