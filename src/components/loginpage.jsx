import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { auth } from "../backend/firebase-config";
import { makeLogin, makeLogout } from "../redux/actions";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const App = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();

  const handleShowClick = () => setShowPassword(!showPassword);
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      dispatch(makeLogin(email));
      
      console.log("The Name", auth.currentUser.displayName);
      console.log("Navigating to other");
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      bgGradient="linear(to-r, teal.500, blue.500, purple.500, pink.500)"
      gap={10}
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
        gap={20}
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar bg="teal.500" />
          <Heading color="white.400">Welcome</Heading>
        </Stack>
        <Box minW={{ base: "90%", md: "368px" }}>
          <form>
            <Stack
              gap={5}
              p="1rem"
              height={250}
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="email address"
                    onChange={(event) => {
                      setemail(event.target.value);
                    }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(event) => {
                      setpassword(event.target.value);
                    }}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={(event) => login(event)}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        <Text fontSize="30px" color="blackAlpha.900" fontWeight="extrabold">
          New to us :
        </Text>
        <Link to={"/register"}>
          <Text
            bgGradient="linear(to-l, white , green ,  white  white , green , white)"
            bgClip="text"
            fontSize="3xl"
            color="whiteAlpha.700"
            fontWeight="extrabold"
          >
            Register
          </Text>
        </Link>
      </Box>
    </Flex>
  );
};

export default App;
