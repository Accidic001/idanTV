// src/types/movie.ts
export interface Movie {
  id: number;
  title: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  overview?: string;
  release_date?: string;
  vote_average?: number | null;
  vote_count?: number;
  popularity?: number;
  adult?: boolean;
  video?: boolean;
  genre_ids?: number[];
  original_language?: string;
  original_title?: string;
}

export interface PageProps {
  params?: Record<string, string>;
  searchParams?: Record<string, string | string[]>;
}

export interface MovieDetails extends Movie {
  belongs_to_collection?: null | {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  };
  budget?: number;
  genres?: {
    id: number;
    name: string;
  }[];
  homepage?: string | null;
  imdb_id?: string | null;
  production_companies?: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries?: {
    iso_3166_1: string;
    name: string;
  }[];
  revenue?: number;
  runtime?: number | null;
  spoken_languages?: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status?: string;
  tagline?: string | null;
  videos?: {
    results: {
      id: string;
      key: string;
      name: string;
      site: string;
      size: number;
      type: string;
      official: boolean;
    }[];
  };
  credits?: {
    cast: {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string | null;
      cast_id: number;
      character: string;
      credit_id: string;
      order: number;
    }[];
    crew: {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string | null;
      credit_id: string;
      department: string;
      job: string;
    }[];
  };
}

export interface MovieCardProps {
  id: number;
  title: string;
  poster_path?: string | null;
  release_date?: string | null;
  vote_average?: number | null;
}