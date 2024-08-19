import { Badge } from '@chakra-ui/react'

interface Props{
    votes: number
}

const Vote = ({votes} : Props) => {
  votes = votes ?? 0
  votes = Number(votes.toFixed(1))

  let color = votes > 7 ? 'green' : votes > 5 ? 'yellow' : 'red'

  return (
   <Badge colorScheme={color} fontSize='14px' paddingX={2} borderRadius={10}>{votes}</Badge>
  )
}

export default Vote