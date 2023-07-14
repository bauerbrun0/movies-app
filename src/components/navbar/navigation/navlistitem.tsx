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
        <li className="md:inline">
            <Link
                href={linkHref}
                className="
                    grid grid-cols-[calc(12.5%+1.5rem)_50%] items-center
                    py-3 active:bg-neutral-800
                    md:grid-cols-1 md:justify-items-center
                    md:active:bg-transparent md:inline md:mx-6 md:py-0 md:my-3
                    lg:mx-8
                "
            >
                <Image
                    src={icon}
                    alt={iconAlt}
                    width={40}
                    height={40}
                    className="inline justify-self-end w-6 h-6 mr-4 md:hidden"
                />
                <span className="md:font-semibold md:active:text-primary-button lg:hover:text-primary-button">{text}</span>
            </Link>
        </li>
    );
}