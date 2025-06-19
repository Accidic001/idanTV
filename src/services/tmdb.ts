import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_BASE_URL,
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
  },
});

export const fetchPopularMovies = async () => {
  const response = await api.get('/movie/popular');
  return response.data.results;
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

export const getImageUrl = (path: string, size: string = 'w500') => {
  return `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/${size}${path}`;
};