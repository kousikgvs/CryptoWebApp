import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import {
  Container,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  Box,
} from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import { useSelector } from "react-redux";
const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { login } = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, [login]);

  if (error)
    return <ErrorComponent message={"Error While Fetching Exchanges"} />;
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"}>
            {exchanges.map((i) => (
              <Box>
                <ExchangeCard
                  key={i.id}
                  name={i.name}
                  img={i.image}
                  rank={i.trust_score_rank}
                  url={i.url}
                />
              </Box>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

const ExchangeCard = ({ name, img, rank, url }) => (
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
      {rank}
    </Heading>

    <Text noOfLines={1}>{name}</Text>
  </VStack>
);

export default Exchanges;
