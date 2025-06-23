'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/services/tmdb';

interface MovieCardProps {
  id: number;
  title: string;
  poster_path?: string | null;
  release_date?: string | null;
  vote_average?: number | null;
}

export default function MovieCard({
  id,
  title,
  poster_path = null,
  release_date = null,
  vote_average = null
}: MovieCardProps) {
  const releaseYear = release_date ? new Date(release_date).getFullYear() : 'N/A';
  const rating = vote_average !== null ? vote_average.toFixed(1) : 'N/A';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/30 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg dark:hover:shadow-gray-900/50">
      <Link href={`/movies/${id}`} prefetch={false}>
        <div className="relative h-64">
          <Image
            src={getImageUrl(poster_path)}
            alt={`${title} poster`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-movie.jpg';
              target.onerror = null;
            }}
          />
        </div>
        <div className="p-4 bg-amber-50 dark:bg-gray-900 rounded-b-lg">
          <h3 className="text-lg font-semibold mb-1 truncate text-gray-900 dark:text-white" title={title}>
            {title}
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300">
              {releaseYear}
            </span>
            <span className="bg-yellow-400 dark:bg-yellow-500 text-black dark:text-gray-900 px-2 py-1 rounded text-sm font-bold">
              {rating}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}