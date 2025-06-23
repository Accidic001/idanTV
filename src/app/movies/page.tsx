import { Suspense } from 'react';
import BackButton from '@/components/BackButton';
import MovieGrid from './components/MovieGrid';
import MovieGridSkeleton from './components/MovieGridSkeleton';
import MovieFilters from './components/MovieFilters';

interface MoviesPageProps {
  searchParams: Promise<{
    category?: string;
    genre?: string;
    year?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const params = await searchParams;
  
  const category = params.category || 'popular';
  const genre = params.genre;
  const year = params.year;
  const sort = params.sort || 'popularity.desc';
  const page = params.page || '1';

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <BackButton />
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Movies</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover popular movies, latest releases, and hidden gems
        </p>
      </div>

      <MovieFilters 
        currentCategory={category}
        currentGenre={genre}
        currentYear={year}
        currentSort={sort}
      />

      <Suspense fallback={<MovieGridSkeleton />}>
        <MovieGrid 
          category={category}
          genre={genre}
          year={year}
          sort={sort}
          page={parseInt(page)}
        />
      </Suspense>
    </main>
  );
}