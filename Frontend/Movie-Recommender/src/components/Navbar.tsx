import { HStack, Image } from '@chakra-ui/react'
import logo from '../assets/movie.png'
import ColorModeSwitch from './ColorModeSwitch'


const Navbar = () => {
  return (
    <HStack padding={3} justifyContent='space-between' boxShadow='0 3px 10px rgb(0 0 0 / 0.2)'>
        <Image src={logo} boxSize="60px" objectFit="fill" />
        <ColorModeSwitch />
    </HStack>
  )
}

export default Navbar