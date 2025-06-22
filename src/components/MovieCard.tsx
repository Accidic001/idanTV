
'use client'; // Add this directive at the top

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
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
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
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1 truncate" title={title}>
            {title}
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{releaseYear}</span>
            <span className="bg-yellow-400 text-black px-2 py-1 rounded text-sm font-bold">
              {rating}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}