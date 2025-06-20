import { getMovieDetails, getImageUrl } from '@/services/tmdb';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import BackButton from '@/components/BackButton';

interface MovieDetailsPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function MovieDetailsPage({ params }: MovieDetailsPageProps) {
  const resolvedParams = await params;
  const movie = await getMovieDetails(resolvedParams.id);

  if (!movie) {
    return notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 ">
        <BackButton />
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src={movie.poster_path ? getImageUrl(movie.poster_path, 'w500') : '/placeholder.jpg'}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-yellow-400 text-black px-3 py-1 rounded-full font-bold">
              {movie.vote_average.toFixed(1)}
            </span>
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span>{movie.runtime} minutes</span>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-700">{movie.overview}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Genres</h2>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre: { id: number; name: string }) => (
                <span key={genre.id} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
          {movie.videos?.results?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Trailer</h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  className="w-full h-96"
                  src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                  title={movie.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}