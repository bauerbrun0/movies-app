'use client';

import { useState, useRef } from "react";

import MovieIcon from "../../../public/icons/movie.svg";
import HomeIcon from "../../../public/icons/home.svg";
import TvIcon from "../../../public/icons/tv.svg";

import Logo from "./logo";
import NavButton from "./navigation/navbutton";
import NavList from "./navigation/navlist";
import NavListItem from "./navigation/navlistitem";
import SearchButton from "./search/searchbutton";
import SearchBar from "./search/searchbar";
import ProfileButton from "./profile/profilebutton";
import ProfileDropDown from "./profile/profiledropdown";


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
            relative z-0
            h-14 bg-background
        ">
            <Logo hidden={searchBar} />
            <NavButton hidden={searchBar} onClick={onNavClick} />
            <SearchBar open={searchBar} onClick={onCancelSearchClick} inputRef={searchInputRef} />
            <SearchButton hidden={searchBar} onClick={onSearchClick} searchInputRef={searchInputRef} />
            <ProfileButton hidden={searchBar} onClick={onProfileClick} />

            <NavList open={navDropDown} hidden={searchBar}>
                <NavListItem text="All" icon={HomeIcon} iconAlt="home icon" linkHref="/" />
                <NavListItem text="Movies" icon={MovieIcon} iconAlt="movie icon" linkHref="/" />
                <NavListItem text="Tv Shows" icon={TvIcon} iconAlt="tv icon" linkHref="/" />
            </NavList>

            <ProfileDropDown open={profileDropDown} hidden={searchBar} />

        </nav>
    );
};