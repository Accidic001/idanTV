
import axios from 'axios';
import { Movie } from '../../types/movie';
import { MoviesResponse } from '../../types/tmdb'; // Adjust the import path as needed

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

// services/tmdb.ts

const API_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL as string;
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY as string;


export async function getTvShowDetails(id: string) {
  const res = await fetch(`${API_URL}/tv/${id}?api_key=${API_KEY}`);
  if (!res.ok) throw new Error('Failed to fetch TV show details');
  return res.json();
}

export async function getTvShowCredits(id: string) {
  const res = await fetch(`${API_URL}/tv/${id}/credits?api_key=${API_KEY}`);
  if (!res.ok) throw new Error('Failed to fetch TV show credits');
  return res.json();
}

export async function getTvShowSeason(id: string, seasonNumber: number) {
  const res = await fetch(
    `${API_URL}/tv/${id}/season/${seasonNumber}?api_key=${API_KEY}`
  );
  if (!res.ok) throw new Error('Failed to fetch TV show season');
  return res.json();
}



export async function getPopularTvShows(page = 1) {
  const res = await fetch(`${API_URL}/tv/popular?api_key=${API_KEY}&page=${page}`);
  if (!res.ok) throw new Error('Failed to fetch popular TV shows');
  return res.json();
}

export async function getTopRatedTvShows(page = 1) {
  const res = await fetch(`${API_URL}/tv/top_rated?api_key=${API_KEY}&page=${page}`);
  if (!res.ok) throw new Error('Failed to fetch top rated TV shows');
  return res.json();
}

export async function getAiringTodayTvShows(page = 1) {
  const res = await fetch(`${API_URL}/tv/airing_today?api_key=${API_KEY}&page=${page}`);
  if (!res.ok) throw new Error('Failed to fetch airing today TV shows');
  return res.json();
}



export async function getMovies({
  category = 'popular',
  genre,
  year,
  sort = 'popularity.desc',
  page = 1,
}: {
  category?: string;
  genre?: string;
  year?: string;
  sort?: string;
  page?: number;
}): Promise<MoviesResponse> {
  let url;
  
  if (category && ['popular', 'now_playing', 'upcoming', 'top_rated'].includes(category)) {
    // Use category endpoints
    url = `${API_URL}/movie/${category}?api_key=${API_KEY}&page=${page}`;
  } else {
    // Use discover endpoint for more complex filtering
    url = `${API_URL}/discover/movie?api_key=${API_KEY}&page=${page}&sort_by=${sort}`;
    
    if (genre) {
      url += `&with_genres=${genre}`;
    }
    
    if (year) {
      url += `&year=${year}`;
    }
  }
  
  const response = await fetch(url, {
    next: { revalidate: 3600 } // Cache for 1 hour
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  
  return response.json();
}