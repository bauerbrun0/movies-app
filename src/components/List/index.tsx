'use client';

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { MediaItem } from "@/types";
import ListItem from "./ListItem";
import { useVisibilitiesRef } from "@/hooks";

export default function List({
    items,
    title,
    listType = "vertical",
    href
}: {
    items: MediaItem[];
    title: string;
    listType?: "vertical" | "horizontal";
    href: string;
}) {
    const listItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const leftItemIndex = useRef(-1);
    const rightItemIndex = useRef(-1);
    const [leftButtonDisabled, setLeftButtonDisabled] = useState(true);
    const [rightButtonDisabled, setRightButtonDisabled] = useState(false);

    const visibilitiesChangedCallback = () => {
        updateOuterItems();
        updateButtons();
    };
    const visibilities = useVisibilitiesRef(listItemRefs, visibilitiesChangedCallback, "x");

    const updateOuterItems = () => {
        leftItemIndex.current = visibilities.current.findIndex(visibility => visibility) - 1;
        // No findLastIndex() for all browsers
        for (let i = visibilities.current.length - 1; i >= 0; i--) {
            if (visibilities.current[i] === true) {
                rightItemIndex.current = i + 1;
                break;
            }
        }
    };

    const updateButtons = () => {
        if (leftItemIndex.current >= 0) {
            setLeftButtonDisabled(false);
        } else {
            setLeftButtonDisabled(true);
        }
        if (rightItemIndex.current < listItemRefs.current.length) {
            setRightButtonDisabled(false);
        } else {
            setRightButtonDisabled(true);
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
        <div className="my-4 md:my-8">
            <div className="grid grid-cols-8 items-end p-3 md:grid-cols-list-header md:pb-4">
                <h2 className="col-span-5 inline text-xl font-medium md:col-span-1 lg:text-2xl">{title}</h2>
                <Link className="
                        col-span-3 justify-self-end w-fit text-neutral-500 active:text-primary-button
                        md:col-span-13 md:justify-self-start md:ml-5 md:hover:text-primary-button
                    "
                    href={href}
                >
                    Show more
                </Link>
                <button
                    onClick={onClickLeft}
                    className={`
                        hidden place-self-center w-fit
                        ${ leftButtonDisabled ? "hover:cursor-not-allowed" : "" }
                        md:block
                    `}
                >
                    <Image
                        src="/icons/arrow-down.svg"
                        alt="arrow left icon"
                        width={50}
                        height={50}
                        className="w-5 rotate-90 lg:w-6"
                    />
                </button>
                <button
                    onClick={onClickRight}
                    className={`
                        hidden place-self-center w-fit
                        ${ rightButtonDisabled ? "hover:cursor-not-allowed" : "" }
                        md:block
                    `}
                >
                    <Image
                        src="/icons/arrow-down.svg"
                        alt="arrow right icon"
                        width={50}
                        height={50}
                        className="w-5 -rotate-90 lg:w-6"
                    />
                </button>
            </div>
            <div className="
                grid gap-3 grid-flow-col auto-cols-max overflow-x-auto
                px-3 no-scrollbar
                lg:gap-6
            ">
                {items.map((item, index) => {
                    return (
                        <ListItem
                            key={item.id}
                            item={item}
                            imageType={listType === "vertical" ? "poster" : "backdrop"}
                            refCallback={(element: HTMLAnchorElement | null) => {
                                listItemRefs.current[index] = element;
                            }}
                            refIndex={index}
                        />
                    );
                })}
            </div>
        </div>
    );
}