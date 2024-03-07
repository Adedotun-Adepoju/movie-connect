import { ReactNode } from "react"
import SideNav from "./sideNav"
import TopNav from "./topNav"

const MainLayout = ({children}: {children: ReactNode}) => {
    return (
        <div>
           <TopNav />
           <div className="flex flex-row">
             <SideNav />
             {children}
           </div>
        </div>
    )
}
export default MainLayout