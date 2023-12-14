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
  InputRightElement
} from "@chakra-ui/react";
import { auth } from "../backend/firebase-config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import { Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { db } from "../backend/firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const App = () => {
    const navigate = useNavigate();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showrePassword, setShowrePassword] = useState(false);
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "users");

    const handlepwdClick = () => setShowPassword(!showPassword);
    const handlerepwdClick = () => setShowrePassword(!showrePassword);

    // Variables related to date and time
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    const register = async (event) => {
        event.preventDefault();
        try {
            if (!email.includes("@")) {
                toast.error("Invalid email address");
                return;
            }

            if (password.length < 8) {
                toast.error("Password should be at least 8 characters long");
                return;
            }

            if (showPassword !== showrePassword) {
                toast.error("Passwords do not match");
                return;
            }

            console.log(email, password);
            const user = await createUserWithEmailAndPassword(auth, email, password);
            console.log(user);
            await addDoc(collection(db, "users"), {
                name: "",
                email: email,
                password: password,
                address: "",
                country: "India",
                created_at: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
                liked: []
            });

            toast.success("Successfully signed up!");
            navigate("/login");
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getUsers();
    }, []);

    return (
        <Flex
          flexDirection="column"
          width="100wh"
          height="120vh"
          bgGradient="linear(to-r, teal.500, blue.500, purple.500, pink.500)"
          backgroundColor="gray.200"
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
                  height={350}
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
                        children={<CFaUserAlt color="gray.300" />}
                      />
                      <Input type="name" placeholder="Enter your name" />
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
                        placeholder="Enter Your password"
                        onChange={(event) => {
                          setpassword(event.target.value);
                        }}
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handlepwdClick}>
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
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
                        type={showrePassword ? "text" : "password"}
                        placeholder="Re-Enter Your password"
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handlerepwdClick}>
                          {showrePassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                    onClick={(event) => register(event)}
                  >
                    Register
                  </Button>
                </Stack>
              </form>
            </Box>
          </Stack>
          <Box>
            <Text fontSize="30px" color="blackAlpha.900" fontWeight="extrabold">
              Already a Member :
            </Text>
            <Link to={"/login"}>
              <Text
                bgGradient="linear(to-l, white , green ,  white  white , green , white)"
                bgClip="text"
                fontSize="3xl"
                color="whiteAlpha.700"
                fontWeight="extrabold"
              >
                Login
              </Text>
            </Link>
          </Box>
          <ToastContainer />
        </Flex>
    );
};

export default App;