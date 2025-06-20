import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/services/tmdb';

interface MovieCardProps {
  id: number;
  title: string;
  poster_path?: string | null; // Make it optional
  release_date?: string | null; // Make it optional
  vote_average?: number | null; // Already optional
}

export default function MovieCard({ 
  id, 
  title, 
  poster_path = null, // Provide default value
  release_date = null, // Provide default value
  vote_average = null // Provide default value
}: MovieCardProps) {
  // Safely handle release date display
  const releaseYear = release_date ? new Date(release_date).getFullYear() : 'N/A';
  
  // Safely handle vote average display
  const ratingDisplay = vote_average !== null ? vote_average.toFixed(1) : 'N/A';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <Link href={`/movies/${id}`}>
        <div className="relative h-64">
          <Image
            src={poster_path ? getImageUrl(poster_path) : '/placeholder.jpg'}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1 truncate">{title}</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{releaseYear}</span>
            <span className="bg-yellow-400 text-black px-2 py-1 rounded text-sm font-bold">
              {ratingDisplay}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}