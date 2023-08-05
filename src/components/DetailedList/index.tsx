import Link from "next/link";
import { MediaItem } from "@/types";
import DetailedListItem from "./DetailedListItem";

export default function DetailedList({
    items,
    title,
    href
}: {
    items: MediaItem[];
    title: string;
    href: string;
}) {
    const itemsToRender = items.slice(0, 8);

    return (
        <div className="my-4 md:my-8">
            <div className="grid grid-cols-[auto_1fr] items-center p-3 md:pb-4">
                <h2 className="text-xl font-medium lg:text-2xl">{title}</h2>
                <Link
                    className="inline justify-self-end self-end text-neutral-500 hover:text-primary-button md:justify-self-start md:ml-5"
                    href={href}
                >
                    Show more
                </Link>
            </div>
            <div className="grid grid-cols-1 items-center gap-4 mx-3 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 lg:gap-10 2xl:grid-cols-4">
                {itemsToRender.map((item, index) => <DetailedListItem key={item.id} item={item} index={index}/>)}
            </div>
        </div>
    );
}