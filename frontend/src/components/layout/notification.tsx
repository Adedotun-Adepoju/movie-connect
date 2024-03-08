import Image from "next/image"

const NotificationDropdown = () => {
    const unreadAlert = [
        {
            image: '/images/Profile Picture.png',
            message: 'Steve Harvey created a new post in the Nollywood Community about a trending movie',
            time: '3 mins ago'
        },
        {
            image: '/images/Profile Picture.png',
            message: 'Steve harvey created a new post in the Nollywood Community about a trending movie',
            time: '10 mins ago'
        },
    ]
    const previousAlert = [
        {
            image: '/images/Profile Picture.png',
            message: 'Steve Harvey created a new post in the Nollywood Community about a trending movie',
            time: '3 mins ago'
        },
        {
            image: '/images/Profile Picture.png',
            message: 'Steve harvey created a new post in the Nollywood Community about a trending movie',
            time: '10 mins ago'
        },
    ]
    return (
        <div className="absolute z-10 bg-white border-2 border-ash mt-10 w-96 px-4 flex flex-col gap-y-4 py-6 font-sfpro">
             <p className="text-primary font-bold text-lg">Notification</p>
             <div className="flex flex-col gap-y-4">
                 <h2 className="text-primary font-medium text-xl">Unread Alerts</h2>
                 <div className="flex flex-col gap-y-4">
                    {unreadAlert.map((item, index) => (
                        <div key={index} className="flex flex-row gap-x-2 items-center">
                            <Image src={item.image} alt="Profile Picture" width={72} height={72} />
                            <p className="text-xs font-regular leading-6">
                               {item.message} <br />
                               <span className="text-primary font-bold">{item.time}</span>
                            </p>
                        </div>
                    ))}
                 </div>
             </div>
             <div className="flex flex-col gap-y-4">
                 <h2 className="text-primary font-medium text-xl">Previous Alerts</h2>
                 <div className="flex flex-col gap-y-4">
                    {previousAlert.map((item, index) => (
                        <div key={index} className="flex flex-row gap-x-2 items-center">
                            <Image src={item.image} alt="Profile Picture" width={72} height={72} />
                            <p className="text-xs font-regular leading-6">
                               {item.message} <br />
                               <span className="text-primary font-bold">{item.time}</span>
                            </p>
                        </div>
                    ))}
                 </div>
             </div>
        </div>
    )
}
export default NotificationDropdown