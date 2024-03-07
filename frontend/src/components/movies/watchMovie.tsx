import { RedArrowIcon } from "../icons"
import YoutubeEmbed from "../shared/YoutubeEmbed"
import Disclaimer from "./disclaimer"
const WatchMovie = () => {
    return (
        <div className="flex flex-row justify-center font-sfpro mt-10">
            <div className="border-r-2 border-black w-7/12 flex flex-col gap-y-4">
                <h2 className="flex flex-row items-center text-base font-bold text-primary">
                    <RedArrowIcon />
                    Back to movies
                </h2>
                <YoutubeEmbed embedLink="https://www.youtube.com/embed/KDrrCy6F1EI?si=CkaQfKGVcr7KsIO5" />
                <div>
                    <h2 className="text-black text-xl font-bold ">Synopsis</h2>
                    <p className="text-gray-500 text-sm mt-2">
                        “Shang-Chi and the Legend of the Ten Rings” follows the journey of Shang-Chi, a skilled martial artist who thought he left his mysterious past behind...
                    </p>
                </div>
            </div>
            <Disclaimer />
        </div>
    )
}
export default WatchMovie