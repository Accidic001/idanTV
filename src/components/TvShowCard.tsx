import Image from 'next/image';
import Link from 'next/link';
import { TvShow } from '../../types/tv';
import { getImageUrl } from '@/services/tmdb';

export default function TvShowCard({ show }: { show: TvShow }) {
  return (
    <Link href={`/tv/${show.id}`} className="group">
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
        <Image
          src={
            show.poster_path
              ? getImageUrl(show.poster_path)
              : '/placeholder-movie.jpg'
          }
          alt={show.name}
          fill
          className="object-cover group-hover:opacity-80 transition-opacity"
        />
      </div>
      <h3 className="font-bold group-hover:text-primary transition-colors">
        {show.name}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {show.first_air_date?.split('-')[0]}
      </p>
    </Link>
  );
}