import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import { CloseButton, Container, Box, RadioGroup, HStack, Text, Radio, VStack, Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress, Button } from "@chakra-ui/react";
import axios from "axios";
import { server } from "../index";
import { Loader } from "./Loader";
import ErrorComponent from "./ErrorComponent";
import Chart from "./Chart";
import { wrap } from "framer-motion";

export const CoinDetails = () => {
  const params = useParams();
  const [coins, setCoins] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
   const btns =["24h","7d","14d","30d","60d","200d","1y","max"]
  const switchChartStats =((key)=>{
switch (key) {
  case "24h":
    setDays("24h")
    setLoading(true)
    break;
  case "7d":
    setDays("7d")
    setLoading(true)
    break;
  case "14d":
    setDays("14d")
    setLoading(true)
    break;
  case "30d":
    setDays("30d")
    setLoading(true)
    break;
  case "60d":
    setDays("60d")
    setLoading(true)
    break;
  case "200d":
    setDays("200d")
    setLoading(true)
    break;
  case "1y":
    setDays("365d")
    setLoading(true)
    break;
  case "max":
    setDays("max")
    setLoading(true)
    break;

  default:
    setDays("24h")
    setLoading(true)
    break;
}
  })


  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const {data:chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
        setCoins(data);
        setLoading(false);
        setChartArray(chartData.prices)
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [params.id, currency,days]);

  
  if (error) return <ErrorComponent messages={"error while fetching coins"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box width={"full"} borderWidth={1}>
           <Chart arr={chartArray} currency={currencySymbol} days={days}/>
          </Box>
          <HStack p={4} overflowX={"auto"}>
{
  btns.map((i)=>(
    <Button key={i} onClick={()=>switchChartStats(i)}>{i}</Button>
  ))
}
          </HStack>
      
          
          <RadioGroup value={currency} onChange={setCurrency} p={8}>
            <HStack spacing={4}>
              <Radio value="inr"> INR</Radio>
              <Radio value="usd"> USD</Radio>
              <Radio value="eur"> EUR</Radio>
            </HStack>
          </RadioGroup>
          <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf={"center"} opacity={"0.7"}>
              last updated on {Date(coins.last_updated).split("T")[0]}
            </Text>
            <Image
              src={coins.image.large}
              w={"16"}
              objectFit={"contain"}
              h={16}
            />
            <Stat>
              <StatLabel>{coins.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coins.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coins.market_data.price_change_24h < 0
                      ? "decrease"
                      : "increase"
                  }
                />{" "}
                {coins.market_data.price_change_24h} %
              </StatHelpText>
            </Stat>
            <Badge bgColor={"blackAlpha.700"} color={"white"} fontSize={"2xl"}>
              {`#${coins.market_cap_rank}`}
            </Badge>
            <CustomBar
              high={`${coins.market_data.high_24h[currency]}${currencySymbol}`}
              low={`${coins.market_data.low_24h[currency]}${currencySymbol}`}
            />
            <Box w={"full"} p="4">
              <Item title={"max supply"} value={coins.market_data.max_supply}/>
              <Item title={"circulating supply"} value={coins.market_data.circulating_supply}/>
              <Item title={"market cap"} value={`${currencySymbol}${coins.market_data.market_cap[currency]}`}/>
              <Item title={"all time low"} value={`${currencySymbol}${coins.market_data.atl[currency]} on  ${(coins.market_data.atl_date[currency]).split("T")[0]}`}/>
              <Item title={"all time high"} value={`${currencySymbol}${coins.market_data.ath[currency]} on  ${(coins.market_data.atl_date[currency]).split("T")[0]}`}/>
            </Box>
          </VStack>
       </>
      )}
    </Container>
  );
};

const Item = ({title, value}) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
     {title}
    </Text>
    <Text>
      {value}
    </Text>
  </HStack>
);

const CustomBar = ({ high, low, symbol }) => (
  <VStack w={"full"}>
    
    <Progress value={50} colorScheme={high>low?"teal":"red"} width={"full"} />
    <HStack justifyContent={"space-between"} width={"full"}>
      <Badge children={low} colorScheme="red" />
      <Text fontSize={"sm"}>24 hr range</Text>
      <Badge children={high} colorScheme="green" />
    </HStack>
  </VStack>
);
