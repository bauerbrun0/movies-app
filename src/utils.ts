import { Movie, TvShow, MediaType } from "./types";

export const toMovieOrTvShowArray = (object: unknown): (Movie | TvShow)[] => {
    if (!object || typeof object !== 'object') {
        throw new Error('Missing results array');
    }

    if (!isArray(object)) {
        throw new Error('results is not an array');
    }

    return object.map(v => toMovieOrTvShow(v));
};

const toMovieOrTvShow = (object: unknown): Movie | TvShow => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if (!('media_type' in object)) {
        throw new Error('Missing media type');
    }

    const mediaType = parseMediaType(object.media_type);
    let title: string;

    // A movie's title property is called title, a tv show's is called name
    // Blame TMDB, not me.
    if (mediaType === MediaType.Movie && 'title' in object) {
        title = parseTitle(object.title);
    } else if (mediaType === MediaType.TvShow && 'name' in object) {
        title = parseTitle(object.name);
    } else {
        throw new Error('Incorrect or missing fields');
    }

    if (!('id' in object) || !('poster_path' in object) || !('backdrop_path' in object)) {
        throw new Error('Some fields are missing');
    }

    return {
        title,
        id: parseId(object.id),
        posterPath: parsePosterPath(object.poster_path),
        backdropPath: parseBackdropPath(object.backdrop_path),
        mediaType: mediaType
    };
};

const parseMediaType = (mediaType: unknown): MediaType => {
    if(!isString(mediaType) || !isMediaType(mediaType)) {
        throw new Error('Incorrect media type');
    }

    return mediaType;
};

const parseTitle = (title: unknown): string => {
    if(!isString(title)) {
        throw new Error('Incorrect title');
    }
    return title;
};

const parseId = (id: unknown): number => {
    if(!isNumber(id)) {
        throw new Error('Incorrect id');
    }

    return id;
};

const parsePosterPath = (posterPath: unknown): string => {
    if(!isString(posterPath)) {
        throw new Error('Incorrect poster path');
    }

    return posterPath;
};

const parseBackdropPath = (backdropPath: unknown): string => {
    if(!isString(backdropPath)) {
        throw new Error('Incorrect backdrop path');
    }

    return backdropPath;
};

const isString = (param: unknown): param is string => {
    return typeof param === 'string' || param instanceof String;
};

const isNumber = (param: unknown): param is number => {
    return typeof param === 'number' || param instanceof Number;
};

const isMediaType = (param: string): param is MediaType => {
    return Object.values(MediaType).map(v => v.toString()).includes(param);
};

const isArray = (param: unknown): param is unknown[] => {
    return Array.isArray(param);
};