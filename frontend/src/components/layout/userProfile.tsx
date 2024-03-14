import Image from "next/image"
import { SignoutIcon } from "../icons"

const UserProfile = () => {
    const profileLinks = ['Profile', 'My Communities', 'Settings', 'Help Center']
    return (
        <div className="absolute z-10 bg-white border-2 border-ash mt-10 w-64 flex flex-col py-6 font-sfpro">
            <div className="flex flex-row justify-center self-center pb-6 border-b-2 border-ash w-11/12">
                <Image src='/images/profile.png' alt="user avi" width={112} height={112} />
            </div>
            <div className="flex flex-col gap-y-2 items-start self-center pt-2 pb-4 border-b-2 border-ash w-11/12">
                {profileLinks.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </div>
            <div className="flex flex-row items-center justify-between w-11/12 self-center pt-4">
                <p>Sign out</p> <SignoutIcon />
            </div>
        </div>
    )
}
export default UserProfile