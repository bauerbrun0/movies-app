'server-only';

import { toMovieOrTvShowArray } from "@/utils";
import { Movie, TvShow } from "@/types";


const BASE_URL = "https://api.themoviedb.org/3";

const options = {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
    }
};

const getTrendingAll = async (): Promise<(Movie | TvShow)[]> => {
    const res = await fetch(BASE_URL + "/trending/all/day", options);

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
