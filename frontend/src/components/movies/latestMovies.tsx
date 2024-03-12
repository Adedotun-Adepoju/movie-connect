'use client'
import Link from "next/link"
import { FIlterIcon } from "../icons"
import Image from "next/image"
import { useState, useEffect } from "react"
import TrendingMovies from "./trendingMovies"
import { airtable, latestMoviesSchema } from "../../utils/airtable"
import { movieGenres } from "@/utils/movieGenre"
const LatestMovies = () => {
    const [latestMovies, setLatestMovies] = useState<latestMoviesSchema>()
    const latestMovieId = process.env.NEXT_PUBLIC_AIRTBALE_LATESTMOVIE_ID
    const getLatestMovies = () => {
        airtable.get(`/${latestMovieId}`)
        .then((response) => (setLatestMovies(response.data.records)))
        .catch((error) => console.error(error))
    }
    useEffect(() => {
        getLatestMovies()
    }, [])
    const mobileTabs = ['Latest','Trending', 'Upcoming']
    const [activeTab, setActiveTab] = useState<string>('Latest')
    const [genres, showGenres] = useState(false)
    const [genresTab, setGenresTab] = useState(movieGenres[0])

    const getMovieGenres = (genres: string) => {
        airtable.get(`/${latestMovieId}?filterByFormula=AND(%7BTag%7D+%3D+'${genres}')`)
        .then((response) => ((setLatestMovies(response.data.records), setGenresTab(genres))))
        .catch((error) => (console.error(error)))
        .finally(() => showGenres(!genres))
    }
    return (
        <div className="flex flex-col justify-center pt-10 font-sfpro">
            <div className="lg:hidden flex flex-row w-12/12 border-b-2 border-gray-fill gap-x-6 pl-4 pb-2">
                {mobileTabs.map((item, index) => (
                    <p key={index} onClick={() => setActiveTab(item)}>{item}</p>
                ))}
            </div>
            <div className="flex flex-col items-center">
             <div className="flex flex-row justify-between align-center mt-6 w-11/12 lg:border-b lg:border-black pb-4 mb-2 lg:mb-10 m-auto">
                <h2 className="text-red-800 text-base font-bold font-sfpro">Latest Movies</h2>
                <div className="flex flex-row align-center gap-x-1.5" onClick={() => showGenres(!genres)}>
                    <p className="text-red-800 text-base font-sfpro" >{genresTab}</p>  <FIlterIcon />
                </div>
            </div>
            {genres ? 
            <div className="bg-white border-gray-fill border-2 w-11/12 absolute z-10 mt-14 flex flex-col gap-y-2 px-4 py-4 lg:w-2/12 lg:self-end">
                <h2 className="text-primary font-bold">Movie Genres</h2>
                {movieGenres.map((item, index) => (
                    <p key={index} className="text-sm" onClick={() => getMovieGenres(item)}>{item}</p>
                ))}
            </div> : ''}
            </div>
            <div className="w-screen lg:w-11/12 lg:flex lg:flex-col lg:self-center">
                {activeTab === 'Latest' &&             
                <div className="flex flex-col justify-center m-auto gap-y-6 w-12/12 lg:flex lg:flex-row lg:items-center lg:gap-x-2">
                {latestMovies?.map((item, index) => (
                    <Link href={`/movies/${item.id}`} key={index} className="flex flex-col w-12/12 m-auto mb-8 lg:w-6/12 gap-y-2">
                        <Image src={item.fields.Image[0].url} alt="movie thumbnail" width={504} height={256} className="w-11/12 self-center"/>
                        <h2 className="text-black font-bold text-base ml-4">{item.fields.Name}</h2>
                        <span className="text-black text-base ml-4">{item.fields.Movietype}</span>
                        <p className="text-gray-400 text-sm w-11/12 self-center">{item.fields.Summary}</p>
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