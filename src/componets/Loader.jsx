import { VStack,Box, Spinner } from '@chakra-ui/react'
import React from 'react'

export const Loader = () => {
  return (
    <>
    <VStack h={"90vh"} justifyContent={"center"} >
    <Box transform={"scale(3)"}> 
    <Spinner  speed={"0.35s"} size={"xl"}/>

    </Box>

    </VStack>
    </>
  )
}
