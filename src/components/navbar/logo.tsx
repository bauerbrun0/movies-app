import Image from "next/image";
import Link from "next/link";

export default function Logo(
    { hidden }: { hidden: boolean }
) {
    return (
        <div
            data-test='logo'
            className={`
                ${ hidden ? "invisible md:visible" : "visible"}
                w-full py-3 pl-3 bg-background lg:pl-0 text-center
            `}
        >
            <Link
                className="inline-block align-middle"
                href="/"
            >
                <Image
                    src="/images/logo.svg"
                    alt="Logo"
                    width={50}
                    height={50}
                    className="h-8 w-8 md:h-10 md:w-10 lg:h-11 lg:w-11"
                />
            </Link>
        </div>
    );
}