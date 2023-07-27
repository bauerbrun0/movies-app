import Link from "next/link";
import Image from "next/image";

import { Movie, TvShow } from "@/types";
import { TMDB_IMAGE_BASE_URL } from "@/constants";

export default function ListItem({
    item,
    imageType,
    refCallback,
    refIndex
}: {
    item: Movie | TvShow,
    imageType: "poster" | "backdrop",
    refCallback: (element: HTMLAnchorElement | null) => void,
    refIndex: number
}) {
    return (
        <Link
            className="inline-block max-w-fit"
            href='/'
            ref={refCallback}
            data-refindex={refIndex}
        >
            {
                imageType === "poster"
                ? (
                    <Image
                        className="w-40 rounded-md md:w-52 lg:w-60"
                        src={TMDB_IMAGE_BASE_URL + item.posterPath}
                        alt={item.title + "poster image"}
                        width={300}
                        height={300}
                        priority
                    />
                )
                : (
                    <div className="relative">
                        <Image
                            className="w-72 rounded-md border-b border-b-black md:w-80 lg:w-96"
                            src={TMDB_IMAGE_BASE_URL + item.backdropPath}
                            alt={item.title + "bacdrop image"}
                            width={300}
                            height={300}
                            priority
                        />
                        <h3 className="
                                absolute bottom-0 w-full p-4 rounded-b-md
                                font-medium truncate bg-gradient-to-t from-black to-transparent
                                lg:text-lg
                            ">
                            {item.title}
                        </h3>
                    </div>
                )
            }
        </Link>
    );
}