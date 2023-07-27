import 'server-only';

import { toMovieOrTvShowArray } from "@/utils";
import { Movie, TvShow } from "@/types";
import { TMDB_BASE_URL } from '@/constants';

const baseOptions = {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
    }
};

const getTrendingAll = async (): Promise<(Movie | TvShow)[]> => {
    const res = await fetch(TMDB_BASE_URL + "/trending/all/day", {
        ...baseOptions,
        next: {
            revalidate: 60 * 60 * 24
        }
    });

    if(!res.ok) {
        throw new Error(`Couldn't fetch data`);
    }

    const json = await res.json();
    return toMovieOrTvShowArray(json.results);
};

const TMDBService = {
    getTrendingAll
};

export default TMDBService;
