'use client';

import { useState, useRef } from "react";

import Logo from "./Logo";
import NavButton from "./NavButton";
import NavList from "./NavList";
import NavListItem from "./NavListItem";
import SearchButton from "./SearchButton";
import SearchBar from "./SearchBar";
import ProfileButton from "./ProfileButton";
import ProfileDropDown from "./ProfileDropdown";


export default function Navbar() {
    const [navDropDown, setNavDropDown] = useState(false);
    const [profileDropDown, setProfileDropDown] = useState(false);
    const [searchBar, setSearchBar] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const onNavClick = () => setNavDropDown(!navDropDown);
    const onProfileClick = () => setProfileDropDown(!profileDropDown);
    const onSearchClick = () => setSearchBar(!searchBar);
    const onCancelSearchClick = () => setSearchBar(!searchBar);

    return (
        <nav className="
            grid grid-cols-8 items-center
            relative z-10 [transform:translate3d(0,0,0)]
            h-14 bg-background text-text
            md:h-16 lg:grid-cols-16 lg:h-20
        ">
            <Logo hidden={searchBar} />
            <NavButton hidden={searchBar} onClick={onNavClick} />
            <SearchBar open={searchBar} onClick={onCancelSearchClick} inputRef={searchInputRef} />
            <SearchButton hidden={searchBar} onClick={onSearchClick} searchInputRef={searchInputRef} />
            <ProfileButton hidden={searchBar} onClick={onProfileClick} />

            <NavList open={navDropDown} hidden={searchBar}>
                <NavListItem text="All" icon="/icons/home.svg" iconAlt="home icon" linkHref="/" />
                <NavListItem text="Movies" icon="/icons/movie.svg" iconAlt="movie icon" linkHref="/movies" />
                <NavListItem text="Tv Shows" icon="/icons/tv.svg" iconAlt="tv icon" linkHref="/tv-shows" />
            </NavList>

            <ProfileDropDown open={profileDropDown} hidden={searchBar} />

        </nav>
    );
};