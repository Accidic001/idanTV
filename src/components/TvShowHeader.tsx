import Image from 'next/image';
import { TvShow } from '../../types/tv';
import { getImageUrl } from '@/services/tmdb';

export default function TvShowHeader({ show }: { show: TvShow }) {
  return (
    <div className="relative mb-6 md:mb-8">
      {/* Backdrop with gradient overlay */}
      <div className="relative aspect-video w-full h-auto max-h-[25vh] sm:max-h-[33vh] md:max-h-[50vh]">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent z-10" />
        <Image
          src={getImageUrl(show.backdrop_path)}
          alt={show.name}
          fill
          className="object-cover rounded-lg"
          priority
          sizes="(max-width: 768px) 100vw, 80vw"
        />
      </div>
      
      {/* Content container */}
      <div className="relative z-20 px-4 sm:px-6 -mt-16 sm:-mt-20 md:-mt-32">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Poster image - hidden on smallest screens */}
          <div className="hidden xs:block w-32 h-48 sm:w-40 sm:h-60 md:w-48 md:h-72 shrink-0">
            <Image
              src={getImageUrl(show.poster_path)}
              alt={show.name}
              width={300}
              height={450}
              className="w-full h-full object-cover rounded-lg shadow-lg"
              priority
            />
          </div>
          
          {/* Show details */}
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{show.name}</h1>
            
            {/* Metadata row */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4 text-sm sm:text-base">
              <span>{new Date(show.first_air_date).getFullYear()}</span>
              <span>•</span>
              <span>{show.number_of_seasons} season{show.number_of_seasons !== 1 ? 's' : ''}</span>
              <span>•</span>
              <span>{show.number_of_episodes} episode{show.number_of_episodes !== 1 ? 's' : ''}</span>
              <span>•</span>
              <span>⭐ {show.vote_average.toFixed(1)}</span>
            </div>
            
            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
              {show.genres.map((genre) => (
                <span 
                  key={genre.id} 
                  className="px-2 py-1 bg-primary rounded-full text-xs sm:text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            
            {/* Overview */}
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
              {show.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}