
import { searchMovies } from '@/services/tmdb';
import MovieCard from '@/components/MovieCard';
import { notFound } from 'next/navigation';


interface SearchPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

type Movie = {
  id: number;
  title: string;
  poster_path?: string | null;
  overview?: string;
  release_date?: string;
  vote_average?: number | null;
}

export default async function SearchResults({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;
  const queryParam = resolvedSearchParams.q;
  const query = Array.isArray(queryParam) ? queryParam[0] : queryParam;

  if (!query) {
    return notFound();
  }

  const movies = await searchMovies(query);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">
        Search Results for:{' '}
        <span className="text-blue-600">{query}</span>
      </h1>

      {movies.length === 0 ? (
        <p className="text-center text-gray-500">No movies found for your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie: Movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster_path={movie.poster_path ?? undefined}
              release_date={movie.release_date ?? undefined}
              vote_average={movie.vote_average ?? undefined}
            />
          ))}
        </div>
      )}
    </>
  );
}

