import { Genre } from "@/types";
import Link from "next/link";

export default function GenreListItem({
    genre,
    baseHref,
    refCallback,
    refIndex
}: {
    genre: Genre;
    baseHref: string;
    refCallback: (element: HTMLAnchorElement | null) => void;
    refIndex: number;
}) {

    return (
        <div className="
            w-fit mx-1.5 first:ml-3 last:mr-3
            text-center bg-neutral-900 border border-neutral-800 rounded-xl
            lg:mx-3
        ">
            <Link
                className="block w-full h-full py-2 px-3 truncate hover:text-primary-button lg:py-3 lg:px-8"
                data-refindex={refIndex}
                ref={refCallback}
                href={`${baseHref}/${genre.id}`}
            >
                {genre.name}
            </Link>
        </div>
    );
}