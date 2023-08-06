import { Genre, Logo, MediaType, TMDBMediaItem } from "./types";


export const toTMDBMediaItems = (object: unknown): TMDBMediaItem[] => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }

    if (!isArray(object)) {
        throw new Error("Object is not an array");
    }

    return object.map(element => toTMDBMediaItem(element));
};

export const toLogos = (object: unknown): Logo[] => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }

    if (!isArray(object)) {
        throw new Error("Object is not an array");
    }

    return object.map(element => toLogo(element));
};

export const toGenres = (object: unknown): Genre[] => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }

    if (!isArray(object)) {
        throw new Error("Object is not an array");
    }

    return object.map(element => toGenre(element));
};

const toTMDBMediaItem = (object: unknown): TMDBMediaItem => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }

    // Parsing common fields
    if (!("id" in object)) {
        throw new Error("Missing field 'id'");
    }
    const id = parseId(object.id);

    if (!("overview" in object)) {
        throw new Error("Missing field 'overview'");
    }
    const overview = parseOverview(object.overview);

    if (!("vote_average" in object)) {
        throw new Error("Missing field 'vote_average'");
    }
    const voteAverage = parseVoteAverage(object.vote_average);

    if (!("poster_path" in object)) {
        throw new Error("Missing field 'poster_path'");
    }
    const posterPath = parsePosterPath(object.poster_path);

    if (!("backdrop_path" in object)) {
        throw new Error("Missing field 'backdrop_path'");
    }
    const backdropPath = parseBackdropPath(object.backdrop_path);

    if (!("media_type" in object)) {
        throw new Error("Missing field 'media_type'");
    }
    const mediaType = parseMediaType(object.media_type);


    // Parsing unique fields
    let title: string;
    let releaseDate: string;

    switch (mediaType) {
        case MediaType.Movie: {
            if (!("title" in object)) {
                throw new Error("Missing field 'title'");
            }
            title = parseTitle(object.title);
            if (!("release_date" in object)) {
                throw new Error("Missing field 'release_date'");
            }
            releaseDate = parseReleaseDate(object.release_date);
            break;
        }
        case MediaType.TvShow: {
            if (!("name" in object)) {
                throw new Error("Missing field 'name'");
            }
            title = parseTitle(object.name);
            if (!("first_air_date" in object)) {
                throw new Error("Missing field 'first_air_date'");
            }
            releaseDate = parseReleaseDate(object.first_air_date);
            break;
        }
    }

    return {
        id, title, releaseDate, overview, voteAverage, posterPath, backdropPath, mediaType
    };
};

const toLogo = (object: unknown): Logo => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }

    if (!("iso_639_1" in object)) {
        throw new Error("Missing field 'iso_639_1'");
    }
    const language = parseLanguage(object.iso_639_1);

    if (!("file_path" in object)) {
        throw new Error("Missing field 'file_path'");
    }
    const path = parsePath(object.file_path);

    return {
        language, path
    };
};

const toGenre = (object: unknown): Genre => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }

    if (!("id" in object)) {
        throw new Error("Missing filed 'id'");
    }
    if (!("name" in object)) {
        throw new Error("Missing field 'name'");
    }

    const id = parseId(object.id);
    const name = parseName(object.name);

    return {
        id, name
    };
};

// Parsers

const parseId = (id: unknown): number => {
    if(!isNumber(id)) {
        throw new Error("Incorrect id");
    }

    return id;
};

const parseOverview = (overview: unknown): string => {
    if (!isString(overview)) {
        throw new Error("Incorrect overview");
    }

    return overview;
};

const parseVoteAverage = (voteAverage: unknown): number => {
    if(!isNumber(voteAverage)) {
        throw new Error("Incorrect voteAverage");
    }

    return voteAverage;
};

const parsePosterPath = (posterPath: unknown): string => {
    if(!isString(posterPath)) {
        throw new Error("Incorrect poster path");
    }

    return posterPath;
};

const parseBackdropPath = (backdropPath: unknown): string => {
    if(!isString(backdropPath)) {
        throw new Error("Incorrect backdrop path");
    }

    return backdropPath;
};

const parseMediaType = (mediaType: unknown): MediaType => {
    if(!isString(mediaType) || !isMediaType(mediaType)) {
        throw new Error("Incorrect media type");
    }

    return mediaType;
};

const parseTitle = (title: unknown): string => {
    if(!isString(title)) {
        throw new Error("Incorrect title");
    }
    return title;
};

const parseReleaseDate = (releaseDate: unknown): string => {
    if (!isString(releaseDate)) {
        throw new Error("Incorrect releaseDate");
    }

    return releaseDate;
};

const parseLanguage = (language: unknown): string | null=> {
    if (language === null) {
        return language;
    }

    if (isString(language)) {
        return language;
    }

    throw new Error("Incorrect language");
};

const parsePath = (path: unknown): string => {
    if (!isString(path)) {
        throw new Error("Incorrect path");
    }

    return path;
};

export const parseTagline = (tagline: unknown): string => {
    if (!isString(tagline)) {
        throw new Error("Incorrect tagline");
    }

    return tagline;
};

const parseName = (name: unknown): string => {
    if (!isString(name)) {
        throw new Error("Incorrect name");
    }

    return name;
};

// Typeguards

export const isString = (param: unknown): param is string => {
    return typeof param === "string" || param instanceof String;
};

const isNumber = (param: unknown): param is number => {
    return typeof param === "number" || param instanceof Number;
};

const isMediaType = (param: string): param is MediaType => {
    return Object.values(MediaType).map(v => v.toString()).includes(param);
};

const isArray = (param: unknown): param is unknown[] => {
    return Array.isArray(param);
};