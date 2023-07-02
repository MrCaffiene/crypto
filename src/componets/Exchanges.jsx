import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Container, HStack, VStack ,Image, Heading} from '@chakra-ui/react'
import { Loader } from './Loader'
import ErrorComponent from './ErrorComponent'


const Exchanges = () => {
const [exchanges, setExchanges]=useState([])
const [loading, setLoading]=useState(true)
const [error, setError]=useState(false)


useEffect(() => {
  const fetchExchanges =async()=>{
    
  try {
    const {data}=await axios.get(`${server}/exchanges`)
   setExchanges(data)
   setLoading(false)
  } catch (error) {
     setError(true)
    setLoading(false)
   
  }
  }
  fetchExchanges();
}, [])
if(error) return <ErrorComponent messages={"error hogaya bhai"}/>


  return (
    
      <Container maxW={"container.xl"}>
        {
          loading? <Loader/>:<>
          <HStack  wrap={"wrap"} justifyContent={"space-evenly"}>
          { exchanges.map((i)=> (
          <ExchangeCard name={i.name} img={i.image} rank={i.trust_score_rank} key={i.id} url={i.url}/>
          ) )
          }

          </HStack>
          </>
        }

      </Container>
    

   
  )
}

const ExchangeCard=({name,img,rank,url})=>
<a href={url} target={'blank'}>
  <VStack w={52} shadow={'lg'} p={8} borderRadius={"lg"} transition={"all 0.3s"} m={4} css={{"&:hover":{
    transform:"scale(1.1)"
  }}}>
    <Image  src={img} w={"50px"} h={"50px"} objectFit={"contain"} alt='coin'/>
    <h2  noOfLines={1}>{name} </h2>
    <Heading size={"md"} noOfLines={1}>{rank}</Heading>
  </VStack>
</a>

export default Exchanges