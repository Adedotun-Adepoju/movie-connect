import { ReactNode } from "react"
import SideNav from "./sideNav"
import TopNav from "./topNav"
import MobileFooter from "./mobileFooter"

const MainLayout = ({children}: {children: ReactNode}) => {
    return (
        <div>
           <TopNav />
           <div className="flex flex-row">
             <SideNav />
             {children}
           </div>
           <MobileFooter />
        </div>
    )
}
export default MainLayout