export interface TMDBMediaItem {
    id: number;
    title: string;
    releaseDate: string;
    overview: string;
    voteAverage: number;
    posterPath: string;
    backdropPath: string;
    mediaType: MediaType;
}

export interface DetailedTMDBMediaItem extends TMDBMediaItem{
    adult: boolean;
    genres: Genre[];
    homepage: string;
    // ...
}

export interface Genre {
    id: number;
    name: string;
}

// No need to separate Movies and TvShows. MediaItem will be used for listings only.
export interface MediaItem extends TMDBMediaItem {
    logoPath: string | null;
    tagLine: string | null;
}

export interface DetailedMovie extends DetailedTMDBMediaItem {
    mediaType: MediaType.Movie
    // ...
}
export interface DetailedTvShow extends DetailedTMDBMediaItem {
    mediaType: MediaType.TvShow
    // ...
}

export enum MediaType {
    Movie = 'movie',
    TvShow = 'tv'
}

export interface Logo {
    language: string | null;
    path: string;
}