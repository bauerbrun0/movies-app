import Image from "next/image";
import { RefObject } from "react";

export default function SearchButton({
    onClick,
    hidden,
    searchInputRef
}: {
    onClick: () => void,
    hidden: boolean,
    searchInputRef: RefObject<HTMLInputElement>
}) {
    const handleClick = () => {
        setTimeout(() => {
            if (searchInputRef.current) searchInputRef.current.focus();
        }, 0);
        onClick();
    };

    return (
        <div className={`
            ${ hidden ? "hidden": "" }
            grid items-center h-full bg-background
            md:col-start-7 lg:hidden
        `}>
            <button
                className="w-8 h-8 mx-auto"
                onClick={handleClick}
            >
                <Image
                    src="/icons/search.svg"
                    alt="Search icon"
                    width={30}
                    height={30}
                    className="w-6 h-6 mx-auto md:w-8 md:h-8"
                />
            </button>
        </div>
    );
}