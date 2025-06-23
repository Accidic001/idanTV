


export interface TvShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  last_air_date: string;
  number_of_seasons: number;
  number_of_episodes: number;
  vote_average: number;
  genres: { id: number; name: string }[];
  seasons: {
    id: number;
    season_number: number;
    name: string;
    overview: string;
    poster_path: string;
    episode_count: number;
  }[];
}

export interface TvShowCredit {
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path: string;
  }[];
  crew: {
    id: number;
    name: string;
    job: string;
    profile_path: string;
  }[];
}

export interface TvSeason {
  poster_path: any;
  overview: string;
  id: number;
  name: string;
  season_number: number;
  episodes: TvEpisode[];
  
}

export interface TvEpisode {
  id: number;
  name: string;
  overview: string;
  episode_number: number;
  still_path: string;
  air_date: string;
  runtime: number;
}