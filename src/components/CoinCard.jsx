import { Heading, Image, Text, Button, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const CoinCard = ({ id, name, img, symbol, price, currencySymbol = "₹" }) => (
  <VStack
    w={"52"}
    shadow={"lg"}
    p={"8"}
    m={4}
    borderRadius={"lg"}
    transition={"all 0.3s"}
    bgGradient="linear(to-b, #ACB6E5, #86FDE8)"
    css={{
      "&:hover": {
        transform: "scale(1.1)",
      },
    }}
  >
    <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt={"Exchange"} />
    <Heading size={"md"} noOfLines={1}>
      {symbol}
    </Heading>

    <Text noOfLines={1}>{name}</Text>
    <Text noOfLines={1} color={"red.600"}>{price ? `${currencySymbol}${price}` : "NA"}</Text>
    <br />
    <VStack>
      <Button
        rightIcon={<ArrowForwardIcon />}
        width={"100%"}
        border="2px"
        borderColor="blue.500"
      >
        <Link to={`/coin/${id}`}>View Details</Link>
      </Button>
      <Button colorScheme="twitter" width={"100%"}>
        Follow
      </Button>
    </VStack>
  </VStack>
);

export default CoinCard;
