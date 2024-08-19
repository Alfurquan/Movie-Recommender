import { Movie } from './MainLayout'
import { Grid } from '@chakra-ui/react'
import MovieCard from './MovieCard'

interface Props{
  movies: Movie[],
}

const MovieGrid = ({movies}: Props) => {
  return (
    <>
    <Grid templateColumns={{
        base: 'repeat(1, 1fr)', 
        sm: 'repeat(2, 1fr)',   
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',   
      }}
      gap={6}>
      {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </Grid>
    </>
  )
}

export default MovieGrid