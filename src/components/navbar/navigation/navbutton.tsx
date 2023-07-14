import { useState } from "react";
import Image from "next/image";

export default function NavButton({
    onClick,
    hidden
}: {
    onClick: () => void,
    hidden: boolean
}) {
    const [pressed, setPressed] = useState(false);

    const handleClick = () => {
        setPressed(!pressed);
        onClick();
    };

    return (
        <div
            data-test="nav-button"
            className={`
                ${ hidden ? "hidden" : "" }
                col-span-5 grid grid-cols-5
                pl-4 pr-3 h-full bg-background items-center
                md:hidden
            `}
        >
            <button
                className="
                    col-span-3 grid grid-cols-4 items-center
                    px-2 py-1.5 rounded-md bg-neutral-800 text-left
                "
                onClick={handleClick}
            >
                <span className="col-span-3 text-md font-bold">
                    Tv Shows
                </span>
                <Image
                    src="/icons/arrow-down.svg"
                    alt="arrow"
                    width={40}
                    height={40}
                    className={`
                        inline h-3 w-3 justify-self-end self-center transition-transform
                        ${ pressed ? "rotate-180" : "rotate-0" }
                    `}
                />
            </button>
        </div>
    );
}