import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { Box, Grid, GridItem, Heading, useColorModeValue } from "@chakra-ui/react";
import MovieSearch from "./MovieSearch";
import MovieGrid from "./MovieGrid";
import ReactLoading from "react-loading";

export interface Movie{
    id: number,
    title: string,
    genres: Genre[],
    poster_path: string,
    vote_average: number,
    release_date: string,
}

export interface Genre{
    id: number,
    name: string,
}

const MainLayout = () => {
  const [selectedMovieTitle, setSelectedMovieTitle] = useState<string>('');
  const loaderColor = useColorModeValue("gray.300", "white");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [userLikedMovies, setUserLikedMovies] = useState<Movie[]>([]);

  const handleMovieSearch = (title: string) => {
    setIsLoading(true);
    apiClient.post<Movie[]>('/movies/recommend', {title})
        .then(response => {
            setSearchResults(response.data)
            setIsLoading(false)  
            setSelectedMovieTitle(title)     
        })
        .catch(error => {
            console.error(error)
            setIsLoading(false)
        })
  }

  useEffect(() =>{
    setIsLoading(true);
    apiClient.get<Movie[]>('/movies/user_liked')
        .then(response => {
            setUserLikedMovies(response.data)
            setIsLoading(false)
        })
        .catch(error => {
            console.error(error)
            setIsLoading(false)
        })
  }, [])

  return (
    <Grid 
        templateRows="repeat(2)"
        templateColumns="0.5fr"
        gap={10}
        padding={5}
        justifyContent="center">
            <GridItem>
                <Box>
                    <Heading textAlign="center" padding={5}>Recommend Movies</Heading>
                    <MovieSearch handleMovieSearch={handleMovieSearch} />
                </Box>
            </GridItem>
            {
            searchResults.length > 0 && <GridItem>
                <Box 
                 display="flex" 
                 flexDirection="column" 
                 justifyContent="center" 
                 alignItems="center"
                 textAlign="center">
                    { isLoading ? 
                      <ReactLoading type="bars" color={loaderColor} /> :
                      <>
                        {searchResults.length > 0 && <Heading fontSize='x-large' paddingBottom={5}>Showing results for {selectedMovieTitle}</Heading>}
                        <MovieGrid movies={searchResults} /> 
                      </>
                    }
                </Box>
            </GridItem>
            }
            {userLikedMovies.length > 0 && <GridItem>
                <Box 
                 display="flex" 
                 flexDirection="column" 
                 justifyContent="center" 
                 alignItems="center"
                 textAlign="center">
                    { isLoading ? 
                      <ReactLoading type="bars" color={loaderColor} /> :
                      <>
                        <Heading fontSize='x-large' paddingBottom={5}>Movies you may like</Heading>
                        <MovieGrid movies={userLikedMovies} />
                      </>
                    }
                </Box>
            </GridItem>
}
    </Grid>
  )
}

export default MainLayout