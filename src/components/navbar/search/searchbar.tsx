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
            ${ !open ? "invisible transition-[visibility] ease-linear delay-75" : "" }
            absolute grid grid-cols-10 w-full items-center bg-background    
        `}>
            <div className="col-span-8 pl-4 w-full">
                <input
                    type="text"
                    className={`
                            block mx-auto px-3 py-1.5 bg-neutral-800 
                            rounded-md text-md focus:outline-none
                            transition-[width] ease-in
                            ${ !open ? "w-1/12" : "w-full" }
                        `}
                    placeholder="Search"
                    ref={inputRef}
                />
            </div>

            <button onClick={onClick} className="col-span-2 text-sm">
                cancel
            </button>
        </div>
    );
}