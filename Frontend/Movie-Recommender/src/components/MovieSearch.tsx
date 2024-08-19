import { useState } from "react"
import AutoCompleteSearch from "./AutoCompleteSearch"
import apiClient from "../services/api-client"

interface Props{
    handleMovieSearch: (title: string) => void
}

const MovieSearch = ({handleMovieSearch}: Props) => {
  const [searchedMovieTitles, setSearchedMovieTitles] = useState<string[]>([])

  const handleSearch = (item: string) => {
    handleMovieSearch(item)
  }
  
  const handleInputChange = (value: string) => {
    apiClient.get<string []>('/movies/autocomplete', {params: {movie_name: value}})
      .then((response) => {
        setSearchedMovieTitles(response.data)
    })
      .catch((error) => {
        console.error('Failed to fetch movie titles:', error)
    })
  }


  return (
    <>
      <AutoCompleteSearch 
        items={searchedMovieTitles}
        onInputChange={handleInputChange}
        onSelect={handleSearch}
        onSearch={handleSearch}
        placeholderText="Enter a movie name..." />     
    </>
  )
}

export default MovieSearch