import Image from "next/image"
import Link from "next/link"
import { AlarmIcon, ArrowUp, ProfileIcon, SearchIcon } from "../icons"
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
    return (
        <header className="flex flex-row w-12/12 justify-between items-center px-16 py-8 font-sfpro border-b-2 border-grey-500">
            <Image src='/images/logo.svg' alt="movie-connect logo" width={208} height={58} />
            <nav className="flex flex-row items-center gap-x-6">
            {navLinks.map((item, index) => (
                <Link href={item.link} key={index}>
                    <p className="active:border-b-2 border-primary pb-2 font-medium">{item.label}</p>
                </Link>
            ))}
            </nav>
            <div className="flex flex-row items-center gap-x-8">
                <p className="flex flex-row items-center gap-x-2"> <SearchIcon /> Search</p>
                <p className="flex flex-row items-center gap-x-2"> <AlarmIcon /> 5</p>
                <p className="flex flex-row items-center gap-x-2"> <ProfileIcon /> </p>
                <p className="flex flex-row items-center gap-x-2"> NG <ArrowUp /> </p>
            </div>
        </header>
    )
}
export default TopNav