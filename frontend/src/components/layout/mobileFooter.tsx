import { mobileFootRoute } from "@/utils/route"
import Link from "next/link"
import { SideIcons } from "../icons"
const MobileFooter = () => {
    return (
        <footer className="bg-white font-sfpro sticky w-screen bottom-0 flex flex-row justify-between items-center py-4 px-4 border-t-2 border-gray-fill lg:hidden">
            {mobileFootRoute.map((item, index) => (
               <Link href={item.link} key={index} className="flex flex-col items-center gap-y-2 h-16">
                    <SideIcons icon={item.icon} />
                    {item.label}
               </Link> 
            ))}
        </footer>
    )
}
export default MobileFooter