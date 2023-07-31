import 'server-only';

import { MediaItem, MediaType } from '@/types';
import { toTMDBMediaItems, toLogos, parseTagline } from "@/utils";
import { TMDB_BASE_URL, SECONDS_IN_A_DAY } from '@/constants';

const baseOptions = {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
    }
};

const getTrendingAll = async (timeWindow: "day" | "week") => {
    const res = await fetch(`${TMDB_BASE_URL}/trending/all/${timeWindow}`, {
        ...baseOptions,
        next: {
            revalidate: SECONDS_IN_A_DAY
        }
    });

    if(!res.ok) {
        throw new Error("Couldn't fetch data");
    }

    const json = await res.json();
    const TMDBMediaItems = toTMDBMediaItems(json.results);

    // fetching additional data from different endpoints
    const logoPathPromises = TMDBMediaItems.map(item => getLogoPath(item.id, item.mediaType));
    const taglinePromises = TMDBMediaItems.map(item => getTagline(item.id, item.mediaType));
    const resolvedPromises = await Promise.all([...logoPathPromises, ...taglinePromises]);
    const logoPaths = resolvedPromises.slice(0, TMDBMediaItems.length);
    const taglines = resolvedPromises.slice(TMDBMediaItems.length, resolvedPromises.length + 1);

    const mediaItems: MediaItem[] = TMDBMediaItems.map((item, index) => ({
        ...item,
        logoPath: logoPaths[index],
        tagLine: taglines[index]
    }));

    return mediaItems;
};

const getLogoPath = async (mediaId: number, mediaType: MediaType): Promise<string | null> => {
    const res = await fetch(`${TMDB_BASE_URL}/${mediaType}/${mediaId}/images`, baseOptions);

    if(!res.ok) {
        throw new Error("Couldn't fetch data");
    }

    const json = await res.json();
    const logos = toLogos(json.logos);

    if (logos.length === 0) {
        return null;
    }

    const firstEnglishLogo = logos.find(logo => logo.language === "en");
    if (firstEnglishLogo) {
        return firstEnglishLogo.path;
    }

    return logos[0].path;
};

const getTagline = async (mediaId: number, mediaType: MediaType): Promise<string | null> => {
    const res = await fetch(`${TMDB_BASE_URL}/${mediaType}/${mediaId}`, baseOptions);

    if (!res.ok) {
        throw new Error("Couldn't fetch data");
    }

    const json = await res.json();
    const tagline = parseTagline(json.tagline);
    return tagline;
};

const TMDBService = {
    getTrendingAll, getLogoPath, getTagline
};

export default TMDBService;
