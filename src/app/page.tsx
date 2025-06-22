// app/page.tsx
import { Suspense } from 'react';
import { fetchPopularMovies } from '@/services/tmdb';
import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import MovieGridSkeleton from '@/components/skeletons/MovieGridSkeleton';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Popular Movies</h1>
      <div className="mb-8">
        <SearchBar />
      </div>
      <Suspense fallback={<MovieGridSkeleton />}>
        <PopularMovies />
      </Suspense>
    </main>
  );
}

async function PopularMovies() {
  const movies = await fetchPopularMovies();
  return (
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
  );
}