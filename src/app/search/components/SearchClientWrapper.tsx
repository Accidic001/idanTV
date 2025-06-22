// src/app/search/components/SearchClientWrapper.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import SearchResults from './SearchResults';

export default function SearchClientWrapper() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  if (!query) {
    return <p className="text-center text-gray-500">No search query</p>;
  }

  return <SearchResults query={query} />;
}