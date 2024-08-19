import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";

interface Props extends BoxProps{
    children: React.ReactNode
}

const ThemedBorderedBox = ({children, ...props} : Props) => {
  // Define border color based on the color mode
  const borderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Box
      border="1px solid"
      borderColor={borderColor}
      padding="4"
      borderRadius="md"
      {...props}
    >
    {children}
    </Box>
  );
};

export default ThemedBorderedBox;