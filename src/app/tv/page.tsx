import { getPopularTvShows, getTopRatedTvShows, getAiringTodayTvShows } from '@/services/tmdb';
import TvShowCard from '@/components/TvShowCard';
import Section from '@/components/Section';
import { TvShow } from '../../../types/tv';

export default async function TvShowsPage() {
  const [popularShows, topRatedShows, airingTodayShows] = await Promise.all([
    getPopularTvShows(),
    getTopRatedTvShows(),
    getAiringTodayTvShows()
  ]);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">TV Shows</h1>
      
      <Section title="Popular Shows" link="/tv/popular">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {popularShows.results.map((show: TvShow) => (
            <TvShowCard key={show.id} show={show} />
          ))}
        </div>
      </Section>

      <Section title="Top Rated Shows" link="/tv/top-rated">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {topRatedShows.results.map((show: TvShow) => (
            <TvShowCard key={show.id} show={show} />
          ))}
        </div>
      </Section>

      <Section title="Currently Airing" link="/tv/airing-today">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {airingTodayShows.results.map((show: TvShow) => (
            <TvShowCard key={show.id} show={show} />
          ))}
        </div>
      </Section>
    </main>
  );
}