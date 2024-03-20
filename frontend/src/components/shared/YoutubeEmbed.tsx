
const YoutubeEmbed = ({embedLink}: {embedLink?: string}) => {
    return (
        <div>
            <iframe className="w-11/12 rounded-xl" height={312} src={embedLink} />
        </div>
    )
}
export default YoutubeEmbed