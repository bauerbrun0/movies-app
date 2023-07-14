export default function ProfileDropDown({
    open,
    hidden
}: {
    open: boolean,
    hidden: boolean
}) {
    return (
        <div
            data-test="profile-dropdown"
            className={`
                ${ hidden ? "hidden" : ""}
                absolute right-0 top-full
                grid grid-cols-1 
                w-fit bg-neutral-700 rounded-md mr-2 text-md
                transition-[opacity, visibility] ease-in duration-100 z-10
                md:right-3
                ${ open ? "visible opacity-100" : "invisible opacity-0" }
            `}
        >
            <div className="mx-3 mt-4 mb-0">
                <span className="block mb-1">John Doe</span>
                <span className="block font-bold text-xs">john.doe@example.com</span>
            </div>

            <hr className="w-5/6 mx-auto my-3 border-1 border-neutral-500"/>

            <div className="px-3 py-1.5 active:bg-neutral-500">Link 1</div>
            <div className="px-3 py-1.5 active:bg-neutral-500">Link 2</div>

            <hr className="w-5/6 mx-auto my-3 border-1 border-neutral-500"/>

            <div className="mb-3">
                <div className="px-3 py-1.5 active:bg-neutral-500">Sign out</div>
            </div>

        </div>
    );
}