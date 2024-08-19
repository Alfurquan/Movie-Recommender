import { Card, Image, Text, Heading, CardBody, Box } from '@chakra-ui/react'
import { Movie } from './MainLayout'
import getCroppedImageURL from '../services/image-urls'
import { formatDate } from '../utils/date_utils'
import Vote from './Vote'

interface Props{
    movie: Movie
}

const MovieCard = ({movie} : Props) => {
  return (
    <Card borderRadius={10} overflow='hidden' width='300px'>
    <Image src={getCroppedImageURL(movie.poster_path)} 
          alt={movie.title} 
          boxSize="200px" 
          objectFit="cover" 
          width="100%" 
          height="100%" />
    <CardBody>
        <Box>
            <Heading fontSize='large'>{movie.title}</Heading>
            <Box>
              <Text>{formatDate(movie.release_date)}</Text>
              <Vote votes={movie.vote_average} />
            </Box>      
        </Box>
    </CardBody>
</Card>
  )
}

export default MovieCard