import { Suspense } from 'react';
import SearchResults from '@/components/SearchResults';
import BackButton from '@/components/BackButton';

interface SearchPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default function SearchPage(props: SearchPageProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 ">
        <BackButton />
      </div>
      <Suspense fallback={<div>Loading search results...</div>}>
       
        <SearchResults {...props} />
      </Suspense>
    </main>
  );
}