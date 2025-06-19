import { fetchPopularMovies } from '@/services/tmdb';
import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';

// Define or import the Movie type
type Movie = {
  id: number;
  // Add other properties as needed, e.g. title, poster_path, etc.
  [key: string]: any;
};

export default async function Home() {
  const movies: Movie[] = await fetchPopularMovies();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Movie Search</h1>
      <div className="mb-8">
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            release_date={movie.release_date}
            vote_average={movie.vote_average}
          />
        ))}
      </div>
    </main>
  );
}