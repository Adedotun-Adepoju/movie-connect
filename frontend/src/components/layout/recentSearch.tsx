const RecentSearch = () => {
    const recent = ['Movie Community', 'Daniel Smith Post', 'Latest Movies']
    return (
        <div className="absolute z-10 bg-white border-2 border-ash mt-14 w-64 flex flex-col py-6 px-4 gap-y-4 font-sfpro">
            <h2 className="text-primary font-medium text-lg">Recent Searches</h2>
            <div className="flex flex-col gap-y-2">
                {recent.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </div>
        </div>
    )
}
export default RecentSearch