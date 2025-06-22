// 'use client';

// import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { FormEvent, useEffect, useState } from 'react';

// export default function SearchBar() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [query, setQuery] = useState('');

//   // Initialize search input with URL query if present
//   useEffect(() => {
//     const urlQuery = searchParams.get('q');
//     if (urlQuery) {
//       setQuery(decodeURIComponent(urlQuery));
//     }
//   }, [searchParams]);

//   const handleSearch = (e: FormEvent) => {
//     e.preventDefault();
//     const trimmedQuery = query.trim();
//     if (trimmedQuery) {
//       router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
//     }
//   };

//   return (
//     <form onSubmit={handleSearch} className="flex items-center max-w-md mx-auto w-full">
//       <div className="relative w-full">
//         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//           <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
//         </div>
//         <input
//           type="text"
//           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
//           placeholder="Search for movies..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           aria-label="Search movies"
//           enterKeyHint="search"
//         />
//       </div>
//       <button
//         type="submit"
//         className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:opacity-50"
//         disabled={!query.trim()}
//       >
//         Search
//       </button>
//     </form>
//   );
// }


// components/SearchBar.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
     <form onSubmit={handleSearch} className="flex items-center max-w-md mx-auto w-full">
         <div className="relative w-full">

    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">

      <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />

    </div>

 <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search movies"
          enterKeyHint="search"
        />
      </div>
      <button
        type="submit"
        className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:opacity-50"
        disabled={!query.trim()}
      >
        Search
      </button>
    </form>
  );
}