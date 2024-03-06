import { ShortArrowLeftIcon, ShortArrowRightIcon } from "../icons"
import Image from "next/image"
const TrendingMovies = () => {
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
    return (
        <div className="bg-trending w-10/12 m-auto mt-12 p-6  pb-4 font-sfpro">
            <div className="flex flex-row align-center justify-between mb-6">
                <h2 className="text-white font-bold text-xl">Trending Movies</h2>
                <div className="hidden lg:flex flex-row gap-x-1">
                    <ShortArrowLeftIcon /> 
                    <ShortArrowRightIcon />
                </div>
            </div>
            <div className="gap-y-6 flex flex-col justify-center lg:grid grid-cols-4 lg:gap-x-2 mt-4">
                {Trending.map((item, index) => (
                    <div key={index} className="m-auto w-10/12 flex flex-col gap-y-2">
                        <Image src={item.image} alt="trending movie thumbmail" width={250} height={160} />
                        <p className="text-white font-bold">{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default TrendingMovies