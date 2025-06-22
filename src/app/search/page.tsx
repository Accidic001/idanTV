// src/app/search/page.tsx
import { Suspense } from 'react';
import BackButton from '@/components/BackButton';
import SearchResultsSkeleton from './components/SearchResultsSkeleton';
import SearchResults from './components/SearchResults';

// Updated type definition for Next.js 15
type SearchPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
  params: Promise<{ [key: string]: string }>;
};

// Make the component async to handle Promise-based props
export default async function SearchPage(props: SearchPageProps) {
  // Await the searchParams Promise
  const searchParams = await props.searchParams;
  
  const query = Array.isArray(searchParams.q) 
    ? searchParams.q[0] 
    : searchParams.q;

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