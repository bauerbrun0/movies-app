export default function NavList({
    hidden,
    open,
    children
}: {
    hidden: boolean,
    open: boolean,
    children: React.ReactNode
}) {
    return (
        <ul className={`
            ${ hidden ? "hidden" : "" }
            absolute top-full -z-10 grid grid-rows-3 items-center
            w-full py-1 bg-background
            transition-[transform,visibility] ease-in duration-100
            ${ open ? "" : "-translate-y-full invisible" }
        `}>
            {children}
        </ul>
    );
}