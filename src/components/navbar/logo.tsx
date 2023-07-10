import Image from "next/image";

export default function Logo(
    { hidden }: { hidden: boolean }
) {
    return (
        <div className={`
            ${ hidden ? "invisible md:visible" : "visible"}
            w-full py-3 pl-3 bg-background lg:pl-0
        `}>
            <Image
                src="/images/logo.svg"
                alt="Logo"
                width={50}
                height={50}
                className="h-8 w-8 mx-auto md:h-10 md:w-10 lg:h-11 lg:w-11"
            />
        </div>
    );
}