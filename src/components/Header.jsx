import { Link as ChakraLink } from "@chakra-ui/react";
import {
  Button,
  Flex,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useSelector } from "react-redux"; // Import useSelector
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { auth } from "../backend/firebase-config";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { makeLogin, makeLogout } from "../redux/actions";

const Header = () => {
  const location = useLocation(); // Get the current location
  const [activeLink, setActiveLink] = useState(""); // Track the active link
  const isLoggedIn = useSelector((state) => state.userData.isLoggedIn); // Get isLoggedIn from Redux store
  const isLoggedUser = useSelector((state) => state.userData.email); // Get isLoggedIn from Redux store
  const [displayName, setDisplayName] = useState(""); // State to store display name

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const editdata = () => {};

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // If user is logged in, set the display name
        setDisplayName(user.displayName);
        console.log("The display name auth", displayName, " ", isLoggedIn);
      } else {
        setDisplayName(""); // Reset the display name
      }
    });

    return () => {
      // Unsubscribe from the listener when component unmounts
      unsubscribe();
    };
  }, []);

  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully.");
        dispatch(makeLogin(""));
        dispatch(makeLogout());
        // Redirect or perform any other action after sign out
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
  return (
    <Flex
      align="center"
      justify="space-between"
      p="4"
      shadow="base"
      bgColor="gray.800"
      direction={{ base: "column", md: "row" }}
    >
      <HStack spacing="4">
        <Button variant="unstyled" color="white" fontSize="lg" p="2">
          <Link to="/">
            <Text
              fontWeight="bold"
              fontSize="lg"
              color="white"
              _hover={{
                color: "gray.200",
                textDecoration: "underline",
                background: "blue.500",
                borderRadius: "2px",
                padding: "2px 6px",
              }} // Apply hover styles
              onClick={() => handleLinkClick("home")} // Update active link
              border={activeLink === "home" ? "2px solid white" : "none"} // Add border conditionally
              borderRadius="2px" // Add border radius
              padding="2px 6px" // Add padding
              background={activeLink === "home" ? "blue.500" : "none"} // Apply background color conditionally
            >
              Home
            </Text>
          </Link>
        </Button>
        <Button variant="unstyled" color="white" fontSize="lg" p="2">
          <Link to="/exchanges">
            <Text
              fontWeight="bold"
              fontSize="lg"
              color="white"
              _hover={{
                color: "gray.200",
                textDecoration: "underline",
                background: "blue.500",
                borderRadius: "2px",
                padding: "2px 6px",
              }} // Apply hover styles
              onClick={() => handleLinkClick("exchanges")} // Update active link
              border={activeLink === "exchanges" ? "2px solid white" : "none"} // Add border conditionally
              borderRadius="2px" // Add border radius
              padding="2px 6px" // Add padding
              background={activeLink === "exchanges" ? "blue.500" : "none"} // Apply background color conditionally
            >
              Exchanges
            </Text>
          </Link>
        </Button>
        <Button variant="unstyled" color="white" fontSize="lg" p="2">
          <Link to="/coins">
            <Text
              fontWeight="bold"
              fontSize="lg"
              color="white"
              _hover={{
                color: "gray.200",
                textDecoration: "underline",
                background: "blue.500",
                borderRadius: "2px",
                padding: "2px 6px",
              }} // Apply hover styles
              onClick={() => handleLinkClick("coins")} // Update active link
              border={activeLink === "coins" ? "2px solid white" : "none"} // Add border conditionally
              borderRadius="2px" // Add border radius
              padding="2px 6px" // Add padding
              background={activeLink === "coins" ? "blue.500" : "none"} // Apply background color conditionally
            >
              Coins
            </Text>
          </Link>
        </Button>
      </HStack>

      <HStack spacing="4" mt={{ base: "4", md: "0" }}>
        <HStack spacing="4" mt={{ base: "4", md: "0" }}>
          {isLoggedIn ? (
            <Menu>
              <MenuButton
                as={Button}
                variant="outline"
                colorScheme="blue"
                size="md"
                _hover={{ bg: "blue.600" }}
              >
                {isLoggedUser}
              </MenuButton>
              <MenuList>
                <Link to="/edit">
                  <MenuItem>Edit Profile</MenuItem>
                </Link>
                <Link to="/mycoins">
                  <MenuItem>My Coins</MenuItem>
                </Link>
                <Link to="/">
                  <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          ) : (
            <>
              {" "}
              <Button
                variant="outline"
                colorScheme="red"
                size="md"
                _hover={{ textDecoration: "underline", color: "red" }}
              >
                <Link to="/login">
                  <Text
                    fontWeight="bold"
                    color="red"
                    _hover={{ textDecoration: "underline" }}
                    onClick={() => handleLinkClick("login")} // Update active link
                    border={activeLink === "login" ? "2px solid red" : "none"} // Add border conditionally
                    borderRadius="2px" // Add border radius
                    padding="2px 6px" // Add padding
                    background={activeLink === "login" ? "red" : "none"} // Apply background color conditionally
                  >
                    Login
                  </Text>
                </Link>
              </Button>
              <Button
                variant="solid"
                colorScheme="blue"
                size="md"
                _hover={{ bg: "blue.600" }}
                onClick={editdata}
              >
                <Link to="/register">
                  <Text
                    fontWeight="bold"
                    _hover={{ textDecoration: "underline" }}
                    onClick={() => handleLinkClick("register")} // Update active link
                    border={
                      activeLink === "register" ? "2px solid blue" : "none"
                    } // Add border conditionally
                    borderRadius="2px" // Add border radius
                    padding="2px 6px" // Add padding
                    background={activeLink === "register" ? "blue.500" : "none"} // Apply background color conditionally
                  >
                    Signup
                  </Text>
                </Link>
              </Button>
            </>
          )}
        </HStack>
      </HStack>
    </Flex>
  );
};

export default Header;
