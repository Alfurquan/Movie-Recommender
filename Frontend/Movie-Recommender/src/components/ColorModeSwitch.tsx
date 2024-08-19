import { HStack, IconButton, useColorMode } from '@chakra-ui/react'
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const ColorModeSwitch = () => {

  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <HStack>
        <IconButton 
          aria-label={"Change color theme"} 
          size={"sm"} 
          icon={colorMode === 'light' ? <MdDarkMode/> : <MdLightMode/> }
          onClick={toggleColorMode}
          />
    </HStack>
  )
}

export default ColorModeSwitch