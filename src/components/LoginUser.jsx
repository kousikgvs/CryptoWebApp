import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Stack,
  Box,
  Input,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Textarea,
  HStack,
  InputRightElement,
} from "@chakra-ui/react";
import { db } from "../backend/firebase-config";
import {
  Flex,
  FormControl,
  Checkbox,
  Link,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth } from "../backend/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function LoginUser() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const [firstName, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [copassword, setcopassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showcoPassword, setShowcoPassword] = useState(false);

  const toastNotify = (message) => {
    toast(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: "005",
    });
  };
  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      await updateProfile(auth.currentUser, { displayName: email }).catch(
        (err) => console.log(err)
      );
      dispatch({ type: "makelogin" });
      console.log(login);

      toastNotify("We've Logged into your account successfully");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        return toastNotify("The Email Already Exists");
      } else if (error.code === "auth/invalid-email") {
        return toastNotify("The Email Address Provided is Invalid");
      }
    }
  };

  const usersCollectionRef = collection(db, "users");
  const dispatch = useDispatch();
  const { login } = useSelector((state) => state.cart);

  return (
    <>
      <Button variant="ghost" onClick={onOpen}>
        Login
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Login into your account
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
              <Stack spacing={4}>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    onChange={(txt) => setemail(txt.target.value)}
                  />
                </FormControl>

                {/*  Password Field  */}
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      onChange={(txt) => setpassword(txt.target.value)}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Stack>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                if (email !== "" && password !== "") {
                  if (password.length >= 8) {
                    signIn();
                  } else {
                    toastNotify(" ⚠️ Minimum Password should be of length 8");
                  }
                } else {
                  toastNotify("⚠️ Some Fields are empty");
                }
              }}
            >
              Login
            </Button>
            <ToastContainer />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default LoginUser;
