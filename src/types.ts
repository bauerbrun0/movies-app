interface BaseMovieTvShow {
    title: string;
    id: number;
    posterPath: string
}

export interface TvShow extends BaseMovieTvShow {
    mediaType: MediaType.TvShow
}


export interface Movie extends BaseMovieTvShow {
    mediaType: MediaType.Movie
}

export enum MediaType {
    Movie = 'movie',
    TvShow = 'tv'
}