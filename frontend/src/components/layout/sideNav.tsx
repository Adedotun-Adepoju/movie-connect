import { Languages, resourceRoute, sideRoute, topicsRoute } from "@/utils/route"
import Link from "next/link"
import { ArrowUp, ArrowupRed, SideIcons } from "../icons"
const SideNav = () => {
    return (
        <div className="w-4/12 border-r-2 border-grey-500 flex flex-col font-sfpro">
            <div className="flex flex-col h-32 justify-center pl-10 gap-y-4 w-12/12 border-b-2 border-grey-500">
                {sideRoute.map((item, index) => (
                   <Link href={item.link} key={index} className="flex flex-row items-center gap-x-2">
                        <SideIcons icon={item.icon} /> {item.label}
                   </Link>
                ))}
            </div>
            <div className="py-8 pl-10 border-b-2 border-grey-500">
                <p className="flex flex-row items-center pr-10 justify-between">Topics <ArrowupRed /> </p>
                <div className="flex flex-col gap-y-2 mt-4">
                    {topicsRoute.map((item, index) => (
                        <Link href={item.link} key={index}>
                            <p>{item.label}</p>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="py-8 pl-10 border-b-2 border-grey-500">
                <p className="flex flex-row items-center pr-10 justify-between">Resources <ArrowupRed /> </p>
                <div className="flex flex-col gap-y-2 mt-4">
                    {resourceRoute.map((item, index) => (
                        <Link href={item.link} key={index}>
                            <p>{item.label}</p>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="py-8 pl-10">
                <p className="flex flex-row items-center pr-10 justify-between">Languages <ArrowupRed /> </p>
                <div className="flex flex-col gap-y-2 mt-4">
                    {Languages.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default SideNav