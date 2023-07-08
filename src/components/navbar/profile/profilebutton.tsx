import Image from "next/image";
import AvatarIcon from "../../../../public/icons/avatar.svg";

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
        `}>
            <button
                className="w-9 h-9 mx-auto rounded-full bg-neutral-800"
                onClick={onClick}
            >
                <Image
                    src={AvatarIcon}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="w-6 h-6 mx-auto"
                />
            </button>
        </div>
    );
}