import { RefObject } from "react";

export default function SearchBar({
    open,
    onClick,
    inputRef,
}: {
    open: boolean,
    onClick: () => void,
    inputRef: RefObject<HTMLInputElement>
}) {
    return(
        <div className={`
            ${ !open ? "invisible transition-[visibility] ease-linear delay-75 lg:visible" : "" }
            absolute grid grid-cols-10 w-full items-center bg-background
            md:w-[calc(100%*(7/8))] md:right-0 md:h-16
            lg:static lg:col-span-3 lg:w-full lg:justify-items-start
        `}>
            <div className="col-span-8 pl-4 w-full lg:col-span-full lg:pl-0">
                <input
                    type="text"
                    className={`
                            block mx-auto px-3 py-1.5 bg-neutral-800 
                            rounded-md text-md focus:outline-none
                            transition-[width] ease-in
                            ${ !open ? "w-1/12" : "w-full" }
                            lg:w-full lg:py-2
                        `}
                    placeholder="Search"
                    ref={inputRef}
                />
            </div>

            <button onClick={onClick} className="col-span-2 text-md lg:hidden">
                cancel
            </button>
        </div>
    );
}