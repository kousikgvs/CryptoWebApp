import React, { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
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
import { useNavigate } from "react-router-dom";
import { getAuth, updatePassword } from "firebase/auth";
import { useSelector } from "react-redux"; // Import useSelector
import { auth } from "../backend/firebase-config";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const isLoggedUser = useSelector((state) => state.userData.email);
  const [curremail, setcurremail] = useState(isLoggedUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform your update logic here
    updateList(curremail);
    navigate("/");
    console.log("Updated profile:", { name, email, password, address });
  };

  const updateList = async (email) => {
    const collectionRef = collection(db, "users");
    const q = query(collectionRef, where("email", "==", curremail));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const document = querySnapshot.docs[0];
      const documentRef = doc(db, "users", document.id);

      const documentData = document.data();
      const likedArray = documentData.liked || [];

      await updateDoc(documentRef, {
        name: name + "G",
        email: email,
        address: address,
        password: password,
      });
    }
  };

  return (
    <Container
      maxW="100vw"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={6}
      bgGradient="linear(to-r, teal.500, blue.500)"
    >
      <VStack spacing={10} align="stretch" w="100%" textAlign="center">
        <Heading color="white">Edit Profile</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel color="white" w="50%" mx="auto" mb={2}>
              Name
            </FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              bg="gray.100"
              color="black"
              _hover={{ borderColor: "teal.500" }}
              w="50%"
              mx="auto"
            />
          </FormControl>
          <FormControl>
            <FormLabel color="white" w="50%" mx="auto" mb={2}>
              Email
            </FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              bg="gray.100"
              color="black"
              _hover={{ borderColor: "teal.500" }}
              w="50%"
              mx="auto"
            />
          </FormControl>
          <FormControl>
            <FormLabel color="white" w="50%" mx="auto" mb={2}>
              Password
            </FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              bg="gray.100"
              color="black"
              _hover={{ borderColor: "teal.500" }}
              w="50%"
              mx="auto"
            />
          </FormControl>
          <FormControl>
            <FormLabel color="white" w="50%" mx="auto" mb={2}>
              Address
            </FormLabel>
            <Input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              bg="gray.100"
              color="black"
              _hover={{ borderColor: "teal.500" }}
              w="50%"
              mx="auto"
            />
          </FormControl>
          <Button
            colorScheme="teal"
            type="submit"
            bg="teal.500"
            color="white"
            _hover={{ bgColor: "teal.600" }}
            _active={{ bgColor: "teal.700" }}
            w="50%"
            mx="auto"
            mt={4}
          >
            Save Changes
          </Button>
        </form>
      </VStack>
    </Container>
  );
};

export default EditProfile;
