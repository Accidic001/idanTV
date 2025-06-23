import Image from 'next/image';
import Link from 'next/link';
import { Star, Calendar } from 'lucide-react';
import { getImageUrl } from '@/services/tmdb';
import { Movie } from '../../../../types/tmdb'; // Import from shared types

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path 
    ? getImageUrl(movie.poster_path, 'w500') 
    : '/placeholder-movie.jpg';

  return (
    <Link href={`/movies/${movie.id}`} className="group">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden 
                      hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
        <div className="relative aspect-[2/3] overflow-hidden">
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
          {movie.vote_average > 0 && (
            <div className="absolute top-2 right-2">
              <div className="bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                {movie.vote_average.toFixed(1)}
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 
                         dark:group-hover:text-blue-400 transition-colors">
            {movie.title}
          </h3>
          
          {movie.release_date && (
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(movie.release_date).getFullYear()}
            </div>
          )}

          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
            {movie.overview}
          </p>
        </div>
      </div>
    </Link>
  );
}