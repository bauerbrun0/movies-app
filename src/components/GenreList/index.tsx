'use client';

import { useRef, useState } from "react";
import Image from "next/image";
import { Genre } from "@/types";
import { useVisibilitiesRef } from "@/hooks";
import GenreListItem from "./GenreListItem";

export default function GenreList({
    genres,
    baseHref
}: {
    genres: Genre[];
    baseHref: string;
}) {
    const listItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const leftItemIndex = useRef(-1);
    const rightItemIndex = useRef(-1);
    const [leftButtonHidden, setLeftButtonHidden] = useState(true);
    const [rightButtonHidden, setRightButtonHidden] = useState(false);

    const visibilitiesChangedCallback = () => {
        updateOuterItems();
        updateButtons();
    };
    const visibilities = useVisibilitiesRef(listItemRefs, visibilitiesChangedCallback, "x");

    const updateOuterItems = () => {
        leftItemIndex.current = visibilities.current.findIndex(visibility => visibility);
        // No findLastIndex() for all browsers
        for (let i = visibilities.current.length - 1; i >= 0; i--) {
            if (visibilities.current[i] === true) {
                rightItemIndex.current = i;
                break;
            }
        }
    };

    const updateButtons = () => {
        if (leftItemIndex.current >= 1) {
            setLeftButtonHidden(false);
        } else {
            setLeftButtonHidden(true);
        }
        if (rightItemIndex.current < listItemRefs.current.length - 1) {
            setRightButtonHidden(false);
        } else {
            setRightButtonHidden(true);
        }
    };

    const onClickLeft = () => {
        const leftItem = listItemRefs.current[leftItemIndex.current];
        if (leftItem) {
            leftItem.scrollIntoView({ behavior: 'smooth', inline: 'end', block: 'nearest' });
        }
    };

    const onClickRight = () => {
        const rightItem = listItemRefs.current[rightItemIndex.current];
        if (rightItem) {
            rightItem.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
        }
    };

    return (
        <div className="relative">
            <div className="
                grid grid-cols-auto grid-flow-col items-center mt-4
                overflow-x-scroll no-scrollbar
            ">
                {genres.map((genre, index) => (
                    <GenreListItem
                        key={genre.id}
                        genre={genre}
                        baseHref={baseHref}
                        refIndex={index}
                        refCallback={(element: HTMLAnchorElement | null) => {
                            listItemRefs.current[index] = element;
                        }}
                    />
                ))}
            </div>
            <button
                className={`
                    hidden absolute bottom-0 left-0 h-full
                    px-3 bg-gradient-to-r from-black to-transparent hover:to-black hover:border hover:border-neutral-700
                    ${leftButtonHidden ? "" : "lg:block"}
                `}
                onClick={onClickLeft}
            >
                <Image
                    className="w-6 h-6 rotate-90"
                    src="/icons/arrow-down.svg"
                    alt="left arrow icon"
                    width={50}
                    height={50}
                    priority
                />
            </button>
            <button
                className={`
                    hidden absolute bottom-0 right-0 h-full
                    px-3 bg-gradient-to-l from-black to-transparent hover:to-black hover:border border-neutral-700
                    ${rightButtonHidden ? "" : "lg:block"}
                `}
                onClick={onClickRight} >
                <Image
                    className="w-6 h-6 -rotate-90"
                    src="/icons/arrow-down.svg"
                    alt="left arrow icon"
                    width={50}
                    height={50}
                    priority
                />
            </button>
        </div>
    );
}