import { TvShowCredit } from '../../types/tv';
import Image from 'next/image';

export default function CastCarousel({ credits }: { credits: TvShowCredit }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Cast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {credits.cast.slice(0, 12).map(person => (
          <div key={person.id} className="text-center">
            <Image
              src={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
                  : '/placeholder-person.jpg'
              }
              alt={person.name}
              width={200}
              height={300}
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <h3 className="font-bold">{person.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {person.character}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}