'use client'
import Image from "next/image"
import Link from "next/link"
import { AlarmIcon, ArrowUp, ProfileIcon, SearchIcon } from "../icons"
import UserProfile from "./userProfile"
import { useState } from "react"
import NotificationDropdown from "./notification"
import RecentSearch from "./recentSearch"
import MobileNav from "./mobileNav"
import { mobileFootRoute } from "@/utils/route"
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
    const [nav, showNav] = useState(false)
    return (
        <div className="relative flex flex-col">
        <header className="flex flex-row lg:w-12/12 justify-around lg:justify-between items-center lg:px-16 py-8 font-sfpro border-b-2 border-grey-500">
            <Image src='/images/profile.png' alt="user-avi" width={32} height={32} className="lg:hidden" onClick={() => showNav(!nav)}/>
            <Image src='/images/logo.svg' alt="movie-connect logo" width={208} height={58} className="hidden lg:flex"/>
            <nav className="lg:flex lg:flex-row lg:items-center lg:gap-x-6 hidden">
            {navLinks.map((item, index) => (
                <Link href={item.link} key={index}>
                    <p className="active:border-b-2 active:border-primary pb-2 font-medium">{item.label}</p>
                </Link>
            ))}
            </nav>
            <div className="flex flex-row items-center gap-x-8 pr-4">
                <div className="relative flex flex-col items-center cursor-pointer">
                    <p className="flex flex-row items-center gap-x-2 font-bold" onClick={() => dropdown === '' ? setDropdown('search'): setDropdown('')}> <SearchIcon /> <input type="search" placeholder="Search" className="font-bold rounded-2xl py-2 px-2 h-12 text-primary bg-ash focus:outline-none"/> </p>
                    {dropdown === 'search' ? <RecentSearch /> : ''}
                </div>
                <div className="relative flex flex-col items-center cursor-pointer">
                    <p className="flex flex-row items-center gap-x-2" onClick={() => dropdown === '' ? setDropdown('alarm'): setDropdown('')}> <AlarmIcon /> 5</p>
                    {dropdown === 'alarm' ? <NotificationDropdown /> : ''}
                </div>
                <div className="hidden lg:relative lg:flex lg:flex-col lg:items-center lg:cursor-pointer">
                    <p className="flex flex-row items-center gap-x-2" onClick={() => dropdown === '' ? setDropdown('profile'): setDropdown('')}> <ProfileIcon /> </p> 
                    {dropdown === 'profile' ? <UserProfile /> : ''}
                </div>
                <p className="lg:flex lg:flex-row lg:items-center lg:gap-x-2 hidden"> NG <ArrowUp /> </p>
            </div>
        </header> 
        {nav ?  <MobileNav closeNav={() => showNav(!nav)}/> : ''  }
        </div>
    )
}
export default TopNav