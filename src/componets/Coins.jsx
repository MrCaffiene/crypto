import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Container, HStack, VStack ,Image, Heading, Button, Radio, RadioGroup, Center} from '@chakra-ui/react'
import { Loader } from './Loader'
import ErrorComponent from './ErrorComponent'
import Exchanges from './Exchanges'
import { Link } from 'react-router-dom'



const Coins = () => {
const [coins, setCoins]=useState([])
const [loading, setLoading]=useState(true)
const [error, setError]=useState(false)
const [page, setpage]=useState(1)
const [currency, setCurrency]=useState("inr")

const currencySymbol= currency==="inr"?"₹":currency==="eur"?"€":"$"

const changePage =(page)=>{
setpage(page) 
setLoading(true)
}

const btns =  new Array(132).fill(1)

useEffect(() => {
  const fetchCoin =async()=>{
    
  try {
    const {data}=await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
   setCoins(data)
   setLoading(false)
  } catch (error) {
     setError(true)
    setLoading(false)
   
  }
  }
  fetchCoin();
}, [currency,page])
if(error) return <ErrorComponent messages={"error while fetching coins"}/>


  return (
    
      <Container maxW={"container.xl"}>
        {
          loading? <Loader/>:
          <>

          <RadioGroup value={currency} onChange={setCurrency}p={8}> 
            <HStack spacing={4}>
              <Radio value='inr' > INR</Radio>
              <Radio value='usd' > USD</Radio>
              <Radio value='eur' > EUR</Radio>
            </HStack>
          </RadioGroup>
          <HStack justifyContent={"space-evenly"} wrap={"wrap"}>
          { coins.map((i)=> (
          <CoinCard price={i.current_price} id={ i.id}name={i.name} img={i.image} rank={i.trust_score_rank} key={i.id} symbol={i.symbol} currencySymbol={currencySymbol} />
          ) )
          }

          </HStack>
          <HStack w={'full'} p={8} overflowX={"auto"} css={{'&::-webkit-scrollbar': { display: 'none' }}} >

          {
            btns.map((item,index)=>(
              <Button key={index} bgColor={'blackAlpha.900'} color={"white"} onClick={()=>changePage(index+1)}>{index+1}</Button>
            ))
          }

          </HStack>

         
          </>
        }

      </Container>
    

   
  )
}
const CoinCard=({id ,name,img,symbol,price,currencySymbol="₹"})=>
<Link to={`/coins/${id}`} >
  <VStack w={52} shadow={'lg'} p={8} borderRadius={"lg"} transition={"all 0.3s"} m={4} css={{"&:hover":{
    transform:"scale(1.1)"
  }}}>
    <Image  src={img} w={"50px"} h={"50px"} objectFit={"contain"} alt='coin'/>
    <h2  > {name} </h2>
    <h2 >{price?`${currencySymbol}${price}`:"NA"} </h2>
    <Heading size={"md"} noOfLines={1}>{symbol}</Heading>
  </VStack>
</Link>

export default Coins