'use client'
import { userSchema } from "@/utils"
import { ReactNode, createContext, useState } from "react"

type userContextProvider = {
    setUser: (user: userSchema) => void
}
export const userContext = createContext<userSchema | undefined>(undefined)
export const setUserContext = createContext<userContextProvider | undefined>(undefined)

const UserProvider = ({children}: {children: ReactNode}) => {
    const [user, setActiveUser] = useState<userSchema>()
    const setUser = (user: userSchema) => {
        setActiveUser(user)
    }
    return (
        <userContext.Provider value={user}>
            <setUserContext.Provider value={{setUser}}>
                    {children}
            </setUserContext.Provider>
        </userContext.Provider>
    )
}
export default UserProvider