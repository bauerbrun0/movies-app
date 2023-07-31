import Link from "next/link";
import Image from "next/image";
import { TMDB_IMAGE_BASE_URL } from "@/constants";
import { MediaItem, MediaType } from "@/types";


export default function RandomizedBanner({
    items
}:  {
    items: MediaItem[]
}) {
    const getRandomInt = (min: number, max: number): number =>
        Math.floor(Math.random() * (max - min) + min);

    const item = items[getRandomInt(0, items.length)];

    return (
        <div className="relative mx-3 rounded-lg lg:mx-0 lg:rounded-none">
            <Image
                className="
                    w-full h-[450px] object-cover rounded-lg
                    lg:h-[680px] lg:rounded-none
                "
                src={TMDB_IMAGE_BASE_URL + item.backdropPath}
                alt={item.title + " backdrop image"}
                width={2000}
                height={1200}
                priority
            />
            <div className="absolute bottom-0 left-0 w-full pt-20 bg-gradient-to-t from-black text-center lg:text-left">
                <Link href={`/${item.mediaType === MediaType.Movie ? "movies" : "tv-shows"}/${item.id}`}>
                {
                    item.logoPath
                    ? (
                        <Image
                            className="inline-block w-2/3 mx-auto md:w-1/2 lg:w-1/3 lg:ml-7"
                            src={TMDB_IMAGE_BASE_URL + item.logoPath}
                            alt={item.title + " logo"}
                            width={1500}
                            height={600}
                            priority
                        />
                    ) : (
                        <h3 className="text-center text-3xl lg:text-start lg:ml-7">{item.title}</h3>
                    )
                }
                </Link>
                <p className={`
                    w-2/3 my-5 mx-auto text-center ${item.tagLine ? "" : "truncate"}
                    md:w-1/2 md:text-xl lg:w-1/3 lg:m-7 lg:text-start
                `}>
                    {item.tagLine ? item.tagLine : item.overview}
                </p>
            </div>
        </div>
    );
}