'use client'
import Link from "next/link"
import { RedArrowIcon } from "@/components/icons"
import YoutubeEmbed from "@/components/shared/YoutubeEmbed"
import Disclaimer from "@/components/movies/disclaimer"
import { useParams } from "next/navigation"
import { airtable, latestMoviesSchema } from "@/utils/airtable"
import { useEffect, useState, useContext } from "react"
const WatchMovie = ({youtubeLink}: {youtubeLink: string}) => {
    const router = useParams()
    const latestMovieId = process.env.NEXT_PUBLIC_AIRTBALE_LATESTMOVIE_ID
    const [movieRecord, setMovieRecords] = useState<{
        Name: '',
        Summary: '',
        YoutubeLink: ''
    }>()
    const getMovieDetails = () => {
        airtable.get(`${latestMovieId}/${router.id}`)
        .then((response) => (setMovieRecords(response.data.fields), console.log(response.data)))
        .catch((error) => console.error(error))
    }
    useEffect(() => {
        getMovieDetails()
    }, [])
    return (
        <div className="flex flex-row justify-center font-sfpro pt-10">
            <div className="border-r-2 border-grey-600 w-7/12 h-screen flex flex-col gap-y-4">
                <Link href='/movies' className="flex flex-row items-center text-base font-bold text-primary">
                    <RedArrowIcon />
                    Back to movies
                </Link>
                <YoutubeEmbed embedLink={movieRecord?.YoutubeLink}/>
                <div>
                    <h2 className="text-black text-xl font-bold ">{movieRecord?.Name}</h2>
                    <p className="text-gray-500 text-sm mt-2">
                        {movieRecord?.Summary}
                    </p>
                </div>
            </div>
            <Disclaimer />
        </div>
    )
}
export default WatchMovie