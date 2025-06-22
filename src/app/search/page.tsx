// src/app/search/page.tsx
import { Suspense } from 'react';
import BackButton from '@/components/BackButton';
import SearchResultsSkeleton from './components/SearchResultsSkeleton';
import SearchResults from './components/SearchResults';

interface SearchPageProps {
  params?: Record<string, string>;
  searchParams?: { q?: string | string[] };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = Array.isArray(searchParams?.q) ? searchParams.q[0] : searchParams?.q;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <BackButton />
      </div>
      <h1 className="text-2xl font-bold mb-6">
        {query ? `Search Results for: ${query}` : 'Search Movies'}
      </h1>
      <Suspense fallback={<SearchResultsSkeleton />}>
        {query ? <SearchResults query={query} /> : (
          <p className="text-center text-gray-500">Enter a search term</p>
        )}
      </Suspense>
    </main>
  );
}