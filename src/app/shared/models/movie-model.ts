export interface AllMovies {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  }
  

  export interface Geners {
    id: number
    name: string
  }


  export interface movieDetailsResponse {
    backdrop_path: string
    budget: number
    homepage: string
    id: number
    imdb_id: string
    genres:[{
      id: number
      name: string
    }]
    origin_country: string[]
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    production_companies: [{
      id: number
      logo_path: string
      name: string
    }]
    revenue: number
    runtime: number
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
  }


  export interface VideoResponse {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    official: boolean;
    published_at: string;
    site: string;
    size: number;
    type: string;
  }