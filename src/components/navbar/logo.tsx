import Image from "next/image";
import LogoImage from "../../../public/images/logo.svg";

export default function Logo(
    { hidden }: { hidden: boolean }
) {
    return (
        <div className={`
            ${ hidden ? "invisible" : "visible"}
            w-full py-3 pl-3 bg-background
        `}>
            <Image
                src={LogoImage}
                alt="Logo"
                width={50}
                height={50}
                className="h-8 w-8 mx-auto"
            />
        </div>
    );
}