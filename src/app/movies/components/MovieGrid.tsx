import { getMovies, getImageUrl } from '@/services/tmdb';
import MovieCard from './MovieCard';
import Pagination from "@/app/movies/components/Pagination";

// Define the Movie interface
interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  backdrop_path: string | null;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
  vote_count: number;
}

// Define the API response interface
interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface MovieGridProps {
  category: string;
  genre?: string;
  year?: string;
  sort: string;
  page: number;
}

export default async function MovieGrid({
  category,
  genre,
  year,
  sort,
  page,
}: MovieGridProps) {
  try {
    const data: MoviesResponse = await getMovies({
      category,
      genre,
      year,
      sort,
      page,
    });

    if (!data.results || data.results.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🎬</div>
          <h3 className="text-xl font-semibold mb-2">No movies found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your filters to see more results
          </p>
        </div>
      );
    }

    return (
      <div>
        <div className="mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {data.results.length} of {data.total_results.toLocaleString()} movies
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
          {data.results.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <Pagination
          currentPage={page}
          totalPages={Math.min(data.total_pages, 500)} // TMDB limits to 500 pages
          totalResults={data.total_results}
        />
      </div>
    );
  } catch (error) {
    console.error('Error fetching movies:', error);
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold mb-2">Something went wrong</h3>
        <p className="text-gray-500 dark:text-gray-400">
          Please try again later
        </p>
      </div>
    );
  }
}
