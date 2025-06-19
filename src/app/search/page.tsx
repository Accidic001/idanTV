import { searchMovies } from '@/services/tmdb';
import MovieCard from '@/components/MovieCard';
import { notFound } from 'next/navigation';
import BackButton from '@/components/BackButton';

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  // Add other properties as needed
}

interface SearchPageProps {
  searchParams: {
    q: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  if (!searchParams.q) {
    return notFound();
  }

  const movies = await searchMovies(searchParams.q);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <BackButton />
      </div>
      
      <h1 className="text-2xl font-bold mb-6">
        Search Results for: <span className="text-blue-600">{searchParams.q}</span>
      </h1>

      {movies.length === 0 ? (
        <p className="text-center text-gray-500">No movies found for your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie: Movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      )}
    </main>
  );
}