import { notFound } from 'next/navigation';
import { getTvShowDetails, getTvShowCredits, getTvShowSeason } from '@/services/tmdb';
import TvShowHeader from '@/components/TvShowHeader';
import CastCarousel from '@/components/CastCarousel';
import SeasonsAccordion from '@/components/SeasonsAccordion';
import BackButton from '@/components/BackButton';

interface Params {
  params: Promise<{ id: string }>;
}

export default async function TvShowPage({ params }: Params) {
  const { id: showId } = await params;

  try {
    const [showDetails, credits, firstSeason] = await Promise.all([
      getTvShowDetails(showId),
      getTvShowCredits(showId),
      getTvShowSeason(showId, 1)
    ]);

    if (!showDetails) return notFound();

    return (
      <main className="container mx-auto px-4 py-8">
        <div className="mb-2">
        <BackButton/>
        </div>
        <TvShowHeader show={showDetails} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SeasonsAccordion 
              show={showDetails} 
              initialSeason={firstSeason} 
            />
          </div>
          
          <div>
            <CastCarousel credits={credits} />
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Details</h2>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Status:</span> {showDetails.status}
                </p>
                <p>
                  <span className="font-semibold">First Air Date:</span> {showDetails.first_air_date}
                </p>
                <p>
                  <span className="font-semibold">Last Air Date:</span> {showDetails.last_air_date}
                </p>
                <p>
                  <span className="font-semibold">Network:</span> {showDetails.networks?.[0]?.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  } catch  {
    return notFound();
    
  }
}