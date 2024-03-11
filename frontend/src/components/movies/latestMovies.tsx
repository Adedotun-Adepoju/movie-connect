'use client'
import Link from "next/link"
import { FIlterIcon } from "../icons"
import Image from "next/image"
import { useState } from "react"
import TrendingMovies from "./trendingMovies"
const LatestMovies = () => {
    const latest = [
        {
            image: '/images/Movie Thumbnail.png',
            name: 'Shang-Chi and the Legend of the Ten ...',
            type: 'A Chinese Movie',
            link: '/dhdhgfh',
            summary: 'A skilled martial artist who is drawn into the mysterious Ten Rings organization. As he confronts his past and battles formidable adversaries ...'
        },
        {
            image: '/images/Movie Thumbnail.png',
            name: 'To All the Boys: Always and Forever',
            type: 'American romantic comedy-drama',
            link: '/youtube',
            summary: 'The third installment in the "To All the Boys" series, this romantic comedy-drama follows Lara Jean Covey as she navigates the challenges of ...'
        },
        {
            image: '/images/Movie Thumbnail.png',
            name: 'Borat Subsequent Movie film: Delivery ...',
            type: 'American mockumentary comedy',
            link: '/youtube',
            summary: 'A satirical mockumentary comedy film where the fictional Kazakh journalist Borat returns to the United States, encountering real life experiences ...'
        },
    ]
    const mobileTabs = ['Latest','Trending', 'Upcoming']
    const [activeTab, setActiveTab] = useState<string>('Latest')
    return (
        <div className="flex flex-col justify-center pt-10 font-sfpro">
            <div className="lg:hidden flex flex-row w-12/12 border-b-2 border-gray-fill gap-x-6 pl-4 pb-2">
                {mobileTabs.map((item, index) => (
                    <p key={index} onClick={() => setActiveTab(item)}>{item}</p>
                ))}
            </div>
             <div className="flex flex-row justify-between align-center mt-6 w-11/12 lg:border-b lg:border-black pb-4 mb-2 lg:mb-10 m-auto">
                <h2 className="text-red-800 text-base font-bold font-sfpro">Latest Movies</h2>
                <div className="flex flex-row align-center gap-x-1.5">
                    <p className="text-red-800 text-base font-sfpro">Nollywood</p>  <FIlterIcon />
                </div>
            </div>
            <div className="w-screen lg:w-11/12 lg:flex lg:flex-col lg:self-center">
                {activeTab === 'Latest' &&             
                <div className="flex flex-col justify-center m-auto gap-y-6 w-12/12 lg:flex lg:flex-row lg:items-center lg:gap-x-2">
                {latest.map((item, index) => (
                    <Link href={`/movies${item.link}`} key={index} className="flex flex-col w-12/12 m-auto mb-8 lg:w-6/12 gap-y-2">
                        <Image src={item.image} alt="movie thumbnail" width={504} height={256} />
                        <h2 className="text-black font-bold text-base ml-4">{item.name}</h2>
                        <span className="text-black text-base ml-4">{item.type}</span>
                        <p className="text-gray-400 text-sm w-11/12 self-center">{item.summary}</p>
                        <input
                            type="submit"
                            value="PLAY NOW"
                            className="bg-primary text-white w-11/12 self-center lg:self-start lg:ml-4 lg:w-5/12 mt-2 lg:mt-6 rounded-2xl p-2"
                        />
                    </Link>
                ))}                
                </div> }
                {activeTab === 'Trending' && <TrendingMovies />}
            </div>
            <div className="hidden lg:flex lg:flex-row lg:justify-center lg:mt-8 lg:mb-10">
                <TrendingMovies />
            </div>
        </div>
    )
}
export default LatestMovies