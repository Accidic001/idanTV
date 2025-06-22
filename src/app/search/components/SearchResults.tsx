import { searchMovies } from '@/services/tmdb';
import MovieCard from '@/components/MovieCard';
import { Movie } from '../../../../types/movie';

export default async function SearchResults({ query }: { query?: string }) {
  if (!query) {
    return <p className="text-center text-gray-500">Please enter a search query</p>;
  }

  const movies = await searchMovies(query);
  
  return movies.length === 0 ? (
    <p className="text-center text-gray-500">No movies found</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie: Movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          poster_path={movie.poster_path ?? null}
          release_date={movie.release_date}
          vote_average={movie.vote_average}
        />
      ))}
    </div>
  );
}