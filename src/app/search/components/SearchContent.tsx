// src/app/search/components/SearchContent.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import SearchResults from './SearchResults';

export default function SearchContent({ query }: { query?: string }) {
  const searchParams = useSearchParams();
  const queryParam = query || searchParams.get('q');

  if (!queryParam) {
    return <p className="text-center text-gray-500">No search query provided</p>;
  }

  return <SearchResults query={queryParam} />;
}