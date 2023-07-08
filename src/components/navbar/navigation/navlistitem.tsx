import Image from "next/image";
import Link from "next/link";

export default function NavListItem({
    text,
    linkHref,
    icon,
    iconAlt,
}: {
    text: string,
    linkHref: string,
    icon: any,
    iconAlt: string
}) {
    return (
        <li>
            <Link
                href={linkHref}
                className="
                    grid grid-cols-[calc(12.5%+1.5rem)_50%] items-center
                    py-3 active:bg-neutral-800 md:active:bg-transparent
                "
            >
                <Image
                    src={icon}
                    alt={iconAlt}
                    width={40}
                    height={40}
                    className="inline justify-self-end w-6 h-6 mr-4"
                />
                {text}
            </Link>
        </li>
    );
}