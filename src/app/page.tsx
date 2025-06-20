import { fetchPopularMovies } from '@/services/tmdb';
import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
}

export default async function Home() {
  let movies: Movie[] = [];

  try {
    movies = await fetchPopularMovies();
  } catch (error) {
    console.error("Failed to fetch popular movies:", error);
    // fallback or leave movies empty
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Movie Search</h1>
      <div className="mb-8">
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              release_date={movie.release_date}
              vote_average={movie.vote_average}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-red-500">
            Failed to load movies. Please try again later.
          </p>
        )}
      </div>
    </main>
  );
}
