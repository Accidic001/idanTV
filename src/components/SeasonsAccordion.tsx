'use client';

import { useState } from 'react';
import { TvShow, TvSeason } from '../../types/tv';
import { getImageUrl, getTvShowSeason } from '@/services/tmdb';
import Image from 'next/image';

export default function SeasonsAccordion({ 
  show,
  initialSeason
}: { 
  show: TvShow;
  initialSeason?: TvSeason;
}) {
  const [activeSeason, setActiveSeason] = useState(initialSeason?.season_number || 1);
  const [seasonData, setSeasonData] = useState<TvSeason | null>(initialSeason || null);
  const [loading, setLoading] = useState(false);

  const handleSeasonClick = async (seasonNumber: number) => {
    if (seasonNumber === activeSeason) return;
    
    setLoading(true);
    try {
      const data = await getTvShowSeason(show.id.toString(), seasonNumber);
      setSeasonData(data);
      setActiveSeason(seasonNumber);
    } catch (error) {
      console.error('Error loading season:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Seasons</h2>
      
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {show.seasons.map(season => (
          <button
            key={season.id}
            onClick={() => handleSeasonClick(season.season_number)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeSeason === season.season_number
                ? 'bg-primary text-white'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            {season.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : seasonData ? (
        <div>
          <div className="flex gap-6 mb-6">
            <Image
              src={getImageUrl(seasonData.poster_path)}
              alt={seasonData.name}
              width={300}
              height={450}
              className="w-32 h-48 object-cover rounded-lg"
            />
            <div>
              <h3 className="text-xl font-bold mb-2">{seasonData.name}</h3>
              <p className="mb-4">{seasonData.overview || 'No overview available.'}</p>
              <p>{seasonData.episodes.length} episodes</p>
            </div>
          </div>

          <div className="grid gap-4">
            {seasonData.episodes.map(episode => (
              <div key={episode.id} className="p-4 border rounded-lg">
                <div className="flex gap-4">
                  <Image
                    src={getImageUrl(episode.still_path)}
                    alt={episode.name}
                    width={200}
                    height={112}
                    className="w-40 h-24 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-bold">
                      Episode {episode.episode_number}: {episode.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {episode.air_date} • {episode.runtime} mins
                    </p>
                    <p className="text-sm">
                      {episode.overview || 'No description available.'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}