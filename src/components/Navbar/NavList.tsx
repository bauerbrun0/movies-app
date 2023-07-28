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
        <ul
            data-test="nav-list"
            className={`
                ${ hidden ? "hidden" : "" }
                absolute top-full -z-10 grid grid-rows-3 items-center
                w-full py-1 bg-background
                transition-[transform,visibility] ease-in duration-100
                ${ open ? "" : "-translate-y-full invisible" }
                md:visible md:static md:col-span-5 md:col-start-2 md:row-start-1
                md:block md:w-fit md:translate-y-0
                lg:col-span-11 lg:col-start-2
            `}
        >
            {children}
        </ul>
    );
}