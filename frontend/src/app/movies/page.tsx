import LatestMovies from "@/components/movies/latestMovies"
import TrendingMovies from "@/components/movies/trendingMovies"
import MovieProvider from "@/components/movies/movieContext"
const Movies = () => {
    return (
        <MovieProvider>
        <div>
           <LatestMovies />
        </div>
        </MovieProvider>
    )
}
export default Movies