import Image from "next/image";

export default function ProfileButton({
    onClick,
    hidden
}: {
    onClick: () => void,
    hidden: boolean
}) {
    return(
        <div className={`
            ${ hidden ? "hidden" : ""}
            grid items-center
            pr-2 h-full bg-background 
            lg:pr-0
        `}>
            <button
                className="
                    w-9 h-9 mx-auto rounded-full bg-neutral-800
                    md:w-12 md:h-12
                "
                onClick={onClick}
            >
                <Image
                    src="/icons/avatar.svg"
                    alt="avatar"
                    width={40}
                    height={40}
                    className="w-6 h-6 mx-auto md:w-8 md:h-8"
                />
            </button>
        </div>
    );
}