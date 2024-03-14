'us client'
import Image from "next/image"
import Link from "next/link"
import { SignoutIcon, ArrowupRed, CancelIcon } from "../icons"
import { resourceRoute, Languages} from "@/utils/route"
import { useState } from "react"
const MobileNav = ({closeNav}: {closeNav: () => void}) => {
    const profileLinks = [
        {
            link: '/profile',
            label: 'Profile'
        },
        {
            link: '/community',
            label: 'My Community'
        },
        {
            link: '/movies',
            label: 'Movies'
        },
        {
            link: '/settings',
            label: 'setting'
        },
    ]
    const mainLink = [
        {
            link: '/about',
            label: 'About Us'
        },
        {
            link: '/contact',
            label: 'Contact Us'
        },
    ]
    const links = ['Resources', 'Languages']
    const [link, showLink] = useState<string>()
    return (
        <>
            <div className="pb-8 flex flex-col font-sfpro absolute z-10 bg-white w-screen lg:hidden">
                <div className="flex flex-col self-center items-center pt-8 gap-y-4 border-b-2 border-gray-fill w-11/12 pb-4">
                    <div className="self-end" onClick={() => closeNav()}>
                        <CancelIcon />
                    </div>
                    <Image src='/images/profile.png' alt="user-avi" width={64} height={64} />
                    <p className="text-xl font-normal">Jenny Wilson</p>
                </div>
                <nav className="flex flex-col self-center gap-y-4 pb-6 pt-10 border-b-2 border-gray-fill w-11/12">
                    {profileLinks.map((item, index) => (
                        <Link href={item.link} key={index}>
                            {item.label}
                        </Link>
                    ))}
                    <div className="flex flex-col gap-y-2">
                        <p className="flex flex-row items-center justify-between pr-4 font-bold text-xl" onClick={() => link === links[0] ? showLink('') : showLink(links[0])}>Resources  <ArrowupRed /></p>  
                        {link === links[0] && 
                        (resourceRoute.map((item, index) => (
                            <Link href={item.link} key={index} className="flex flex-col">
                                {item.label}
                            </Link>
                        )))}                 
                    </div> 
                    <div className="flex flex-col gap-y-2">
                        <p className="flex flex-row items-center justify-between pr-4 font-bold text-xl" onClick={() => link === links[1] ? showLink('') : showLink(links[1])}>Lanuages  <ArrowupRed /></p>
                        {link === links[1] &&   
                        (Languages.map((item, index) => (
                            <Link href={item.link} key={index} className="flex flex-col">
                                {item.label}
                            </Link>
                        )))}                    
                    </div>
                </nav>
                <nav className="flex flex-col gap-y-4 pl-4 pt-6">
                    {mainLink.map((item, index) => (
                        <Link href={item.link} key={index}>
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="flex flex-row items-center justify-between w-11/12 self-center mt-14 pr-4">
                    <p className="text-primary text-xl">Sign out</p> <SignoutIcon />
                </div>
            </div>
        </>
    )
}
export default MobileNav