'use client'
import { useEffect, useState } from "react"
import { ShortArrowLeftIcon, ShortArrowRightIcon } from "../icons"
import Image from "next/image"
import { airtable, trendingMoviesSchema } from "@/utils/airtable"
import Link from "next/link"
const TrendingMovies = () => {
    const trendingMovieId = process.env.NEXT_PUBLIC_AIRTABLE_TRENDINGMOVIE_ID 
    const Trending = [
        {
            image:'/images/Trending movie thumnail.png',
            name: 'Spider-Man: No Way Home',
        },
        {
            image:'/images/Trending movie thumnail.png',
            name: 'To All the Boys: Always and Forever',
        },
        {
            image:'/images/Trending movie thumnail.png',
            name: 'The Map of Tiny Perfect Things" (2021)',
        },
        {
            image:'/images/Trending movie thumnail.png',
            name: 'Spider-Man: No Way Home',
        },
    ]
    const [trendingovies, setTrendingMovies] = useState<trendingMoviesSchema>()

    const getTrendingMovies = () => {
        airtable.get(`/${trendingMovieId}`)
        .then((response) => (setTrendingMovies(response.data.records)))
        .catch((error) => console.error(error))
    }
    useEffect(() => {
        getTrendingMovies()
    }, [])
    return (
        <div className="font-sfpro flex flex-col w-12/12 lg:w-11/12 pb-6 lg:bg-trending lg:pt-6 lg:pb-24 lg:px-10">
            <div className="hidden lg:flex lg:flex-row lg:justify-between lg:px-6">
                <h2 className="text-white font-bold text-xl">Trending Movies</h2>
                <div className="hidden lg:flex flex-row gap-x-1">
                    <ShortArrowLeftIcon /> 
                    <ShortArrowRightIcon />
                </div>
            </div>
            <div className="flex flex-col items-center gap-y-6 w-12/12 lg:grid lg:grid-cols-4 lg:items-center lg:gap-x-6 lg:mt-6">
                {trendingovies?.map((item, index) => (                
                    <div key={index} className="flex flex-col items-center gap-y-2 w-11/12 lg:h-36">
                        <Image src={item.fields.Image[0].url} alt="trending movie thumbmail" width={250} height={160} className="w-11/12"/>
                        <p className="">{item.fields.Name}</p>
                        <input
                            type="submit"
                            value="View Details"
                            className="bg-primary text-white w-11/12 lg:w-5/12 mt-2 lg:mt-6 rounded-2xl p-2 lg:hidden"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default TrendingMovies