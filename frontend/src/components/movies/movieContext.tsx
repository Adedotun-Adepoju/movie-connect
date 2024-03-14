'use client'
import { ReactNode, createContext, useState } from "react";
import { latestMoviesSchema } from "@/utils/airtable";

type movieContextProvier = {
    setMovies: (movie: latestMoviesSchema) => void
}

export const movieContext = createContext<latestMoviesSchema | undefined>(undefined)
export const setMovieContext = createContext<movieContextProvier | undefined>(undefined)

const MovieProvider = ({children}: {children: ReactNode}) => {
    const [movie, setMovie] = useState<latestMoviesSchema>()
    const setMovies = (movies: latestMoviesSchema) => {
        setMovie(movies)
    }
    return (
        <movieContext.Provider value={movie}>
            <setMovieContext.Provider value={{setMovies}}>
                {children}
            </setMovieContext.Provider>
        </movieContext.Provider>
    )
}
export default MovieProvider