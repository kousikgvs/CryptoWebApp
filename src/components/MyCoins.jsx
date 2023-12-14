import React, { useEffect, useState } from "react";
import {
  VStack,
  Heading,
  Text,
  Container,
  Box,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { db } from "../backend/firebase-config";

const LikedCoinsPage = () => {
  const isLoggedUser = useSelector((state) => state.userData.email);
  const [likedCoins, setLikedCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLikedCoins = async (email) => {
    const collectionRef = collection(db, "users");
    const q = query(collectionRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const document = querySnapshot.docs[0];
      const documentData = document.data();
      const likedArray = documentData.liked || [];
      setLikedCoins(likedArray);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchLikedCoins(isLoggedUser);
  }, [isLoggedUser]);

  return (
    <Container maxW="xl" centerContent>
      <VStack spacing={6} p={6} shadow="xl" bg="white" borderRadius="xl">
        <Heading>Liked Coins</Heading>
        {loading ? (
          <Spinner size="lg" />
        ) : (
          <Box w="100%">
            {likedCoins.length > 0 ? (
              likedCoins.map((coinId) => (
                <Box
                  key={coinId}
                  p={4}
                  borderWidth={1}
                  borderColor="gray.200"
                  borderRadius="md"
                  bg="gray.100"
                >
                  <Text>{coinId}</Text>
                </Box>
              ))
            ) : (
              <Text>No liked coins yet.</Text>
            )}
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default LikedCoinsPage;
