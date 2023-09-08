import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { FaEye, FaStar } from "react-icons/fa"; // Import the icons
import { useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  doc,
} from "firebase/firestore";
import { db } from "../backend/firebase-config";
import { useSelector } from "react-redux"; // Import useSelector

const CoinCard = ({ id, name, img, symbol, price, currencySymbol = "₹" }) => {
  const isLoggedUser = useSelector((state) => state.userData.email);
  const [isFollowed, setIsFollowed] = useState(false);

  // Check if the coin is already followed by the user
  const checkIfFollowed = async () => {
    if (isLoggedUser) {
      const userCollectionRef = collection(db, "users");
      const userQuery = query(
        userCollectionRef,
        where("email", "==", isLoggedUser)
      );
      const userQuerySnapshot = await getDocs(userQuery);

      if (!userQuerySnapshot.empty) {
        const userDocument = userQuerySnapshot.docs[0].data();
        setIsFollowed(userDocument.liked.includes(id));
      }
    }
  };

  // Toggle follow status
  const toggleFollow = async () => {
    if (isLoggedUser) {
      await createList(isLoggedUser, id);
      setIsFollowed((prev) => !prev);
    } else {
      console.log("Please login before following a button");
    }
  };

  const createList = async (email, id) => {
    const collectionRef = collection(db, "users");
    const q = query(collectionRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const document = querySnapshot.docs[0];
      const documentRef = doc(db, "users", document.id);

      const documentData = document.data();
      const likedArray = documentData.liked || [];

      if (likedArray.includes(id)) {
        await updateDoc(documentRef, {
          liked: arrayRemove(id),
        });
      } else {
        await updateDoc(documentRef, {
          liked: arrayUnion(id),
        });
      }
    }
  };

  // Check if the coin is already followed when the component mounts
  useEffect(() => {
    checkIfFollowed();
  }, []);

  return (
    <VStack
      w="100%"
      maxW="250px"
      shadow="xl" // Add box shadow
      p="4"
      borderRadius="3xl"
      transition="all 0.3s"
      bgGradient="linear(to-r, red, pear, lightblue)"
      m="4"
      css={{
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <Image src={img} w="40px" h="40px" objectFit="contain" alt="Coin" />
      <Heading size="sm" noOfLines={1}>
        {symbol}
      </Heading>
      <Text noOfLines={1}>{name}</Text>
      <Text
        noOfLines={1}
        fontWeight="bold" // Add bold font weight
        color="red.500" // Set red color
      >
        {price ? `${currencySymbol}${price}` : "NA"}
      </Text>
      <VStack w="100%" spacing="2" align="stretch">
        <Button
          as={Link}
          to={`/coin/${id}`}
          w="100%"
          leftIcon={<FaEye />} // Add the icon here
          variant="solid"
          colorScheme="purple" // Change color to purple for view details
        >
          View Details
        </Button>
        <Button
          w="100%"
          leftIcon={<FaStar />} // Add the icon here
          variant="solid"
          colorScheme={isFollowed ? "green" : "blue"}
          onClick={() => toggleFollow(isLoggedUser, id)}
        >
          {isFollowed ? "Followed" : "Follow"}
        </Button>
      </VStack>
    </VStack>
  );
};

export default CoinCard;
