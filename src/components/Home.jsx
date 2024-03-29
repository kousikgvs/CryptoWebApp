import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import btcSrc from "../assets/btc.png";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
const Home = () => {
  const isLoggedIn = useSelector((state) => state.userData.isLoggedIn);
  return (
    <Box
      bgColor={"blackAlpha.900"}
      w={"full"}
      h={"92vh"}
      bgGradient="linear(to-r, teal.500, blue.500, purple.500, pink.500)" // Apply gradient background
    >
      <motion.div
        style={{
          height: "80vh",
        }}
        animate={{
          translateY: "20px",
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Image
          w={"full"}
          h={"full"}
          objectFit={"contain"}
          src={btcSrc}
          filter={"grayscale(1)"}
        />
      </motion.div>

      <Text
        fontSize={"6xl"}
        textAlign={"center"}
        fontWeight={"thin"}
        color={"whiteAlpha.700"}
        mt={"-20"}
      >
        Xcrypto
      </Text>
    </Box>
  );
};

export default Home;
