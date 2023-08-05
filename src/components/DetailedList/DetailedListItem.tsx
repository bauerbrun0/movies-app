import Image from "next/image";
import Link from "next/link";
import { MediaItem, MediaType } from "@/types";
import { TMDB_IMAGE_BASE_URL } from "@/constants";
import Rating from "./Rating";

export default function DetailedListItem({
    item,
    index
}: {
    item: MediaItem;
    index: number
}) {
    const displayProperty = (): string => {
        if (index < 3) return "grid";
        if (index < 4) return "hidden md:grid";
        if (index < 6) return "hidden lg:grid";
        return "hidden 2xl:grid";
    };

    return (
        <div className={`${displayProperty()} grid-cols-2 gap-4`}>
            <Link
                className="inline"
                href={`/${item.mediaType === MediaType.Movie ? "movies" : "tv-shows"}/${item.id}`}
            >
                <Image
                    className="w-full self-center rounded-md"
                    src={TMDB_IMAGE_BASE_URL + item.posterPath}
                    alt={item.title + " poster"}
                    width={600}
                    height={1000}
                    priority
                />
            </Link>
            <div>
                <Link href={`/${item.mediaType === MediaType.Movie ? "movies" : "tv-shows"}/${item.id}`}>
                    <h3 className="w-fit mb-1 line-clamp-2 font-medium hover:text-primary-button 2xl:text-xl">{item.title}</h3>
                </Link>
                <p className="line-clamp-6 text-neutral-400 2xl:line-clamp-[8]">{item.overview}</p>
                <Rating rating={item.voteAverage} />
            </div>
        </div>
    );
}