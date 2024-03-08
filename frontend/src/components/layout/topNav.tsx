'use client'
import Image from "next/image"
import Link from "next/link"
import { AlarmIcon, ArrowUp, ProfileIcon, SearchIcon } from "../icons"
import UserProfile from "./userProfile"
import { useState } from "react"
import NotificationDropdown from "./notification"
import RecentSearch from "./recentSearch"
const TopNav = () => {
    const navLinks = [
        {
            label: 'Home',
            link: '/',
        },
        {
            label: 'Community',
            link: '/community',
        },
        {
            label: 'Movies',
            link: '/movies',
        },
        {
            label: 'Contact',
            link: '/contact',
        },
    ]
    const [dropdown, setDropdown] = useState('')

    return (
        <header className="flex flex-row w-12/12 justify-between items-center px-16 py-8 font-sfpro border-b-2 border-grey-500">
            <Image src='/images/logo.svg' alt="movie-connect logo" width={208} height={58} />
            <nav className="flex flex-row items-center gap-x-6">
            {navLinks.map((item, index) => (
                <Link href={item.link} key={index}>
                    <p className="active:border-b-2 active:border-primary pb-2 font-medium">{item.label}</p>
                </Link>
            ))}
            </nav>
            <div className="flex flex-row items-center gap-x-8">
                <div className="relative flex flex-col items-center cursor-pointer">
                    <p className="flex flex-row items-center gap-x-2 font-bold" onClick={() => dropdown === '' ? setDropdown('search'): setDropdown('')}> <SearchIcon /> <input type="search" placeholder="Search" className="font-bold rounded-2xl py-2 px-2 h-12 text-primary bg-ash focus:outline-none"/> </p>
                    {dropdown === 'search' ? <RecentSearch /> : ''}
                </div>
                <div className="relative flex flex-col items-center cursor-pointer">
                    <p className="flex flex-row items-center gap-x-2" onClick={() => dropdown === '' ? setDropdown('alarm'): setDropdown('')}> <AlarmIcon /> 5</p>
                    {dropdown === 'alarm' ? <NotificationDropdown /> : ''}
                </div>
                <div className="relative flex flex-col items-center cursor-pointer">
                    <p className="flex flex-row items-center gap-x-2" onClick={() => dropdown === '' ? setDropdown('profile'): setDropdown('')}> <ProfileIcon /> </p> 
                    {dropdown === 'profile' ? <UserProfile /> : ''}
                </div>
                <p className="flex flex-row items-center gap-x-2"> NG <ArrowUp /> </p>
            </div>
        </header>
    )
}
export default TopNav