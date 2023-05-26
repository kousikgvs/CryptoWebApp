import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  IconButton,
  useDisclosure,
  useColorModeValue,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import CreateUser from "./CreateUser";
import LoginUser from "./LoginUser";
import { Link } from "react-router-dom";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  SettingsIcon,
  EditIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import { useSelector } from "react-redux";
const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile, setIsMobile] = useState(false);
  const bg = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("gray.800", "white");
  const { login } = useSelector((state) => state.cart);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 600);
  };

  useState(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [login]);
  console.log(login);
  return (
    <Box
      bg={bg}
      color={color}
      boxShadow="md"
      bgGradient="linear(to-b, #FFE6FA, #FFE6FA)"
    >
      <Flex
        as="nav"
        align="center"
        wrap="wrap"
        w="100%"
        p={4}
        borderBottom="1px"
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Flex align="center" w={"100%"} justifyContent={"space-between"}>
          <Text as="h1" fontSize="xl" fontWeight="bold" mr={8}>
            Crypto
          </Text>

          {isMobile ? (
            <IconButton
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              variant="ghost"
              aria-label="Toggle navigation"
              onClick={isOpen ? onClose : onOpen}
            />
          ) : (
            <Flex w={"100%"} justifyContent={"center"}>
              <Button variant="ghost" mr={4}>
                <Link to="/">Home</Link>
              </Button>
              <Button variant="ghost">
                <Link to="/coins">Coins</Link>
              </Button>
              <Button variant="ghost">
                <Link to="/exchanges">Exchanges</Link>
              </Button>
              <Flex
                w={"100%"}
                justifyContent={"flex-end"}
                alignItems={"center"}
                gap={4}
              >
                {login ? (
                  <Menu>
                    <MenuButton as={Button} rightIcon={<SettingsIcon />}>
                      Settings
                    </MenuButton>
                    <MenuList>
                      <MenuItem as={Button} rightIcon={<EditIcon />}>
                        Profile
                      </MenuItem>
                      <MenuItem as={Button} rightIcon={<ExternalLinkIcon />}>
                        SignOut
                      </MenuItem>
                    </MenuList>
                  </Menu>
                ) : (
                  <>
                    <Flex
                      w={"100%"}
                      justifyContent={"flex-end"}
                      alignItems={"center"}
                      gap={4}
                    >
                      <LoginUser />
                      <Text as="h1" fontSize="xl" fontWeight="bold">
                        /
                      </Text>
                      <CreateUser />
                    </Flex>
                  </>
                )}
              </Flex>
            </Flex>
          )}
        </Flex>
        {isOpen && (
          <Box display="block" w="100%" mt={4} borderBottom="1px">
            <Button variant="ghost" w={"100%"} mr={4}>
              <Link to="/">Home</Link>
            </Button>
            <Button variant="ghost" w={"100%"}>
              <Link to="/coins">Coins</Link>
            </Button>
            <Button variant="ghost" w={"100%"}>
              <Link to="/exchanges">Exchanges</Link>
            </Button>
            <Button variant="ghost" w={"100%"}>
              {login ? (
                <>
                  <Menu>
                    <MenuButton as={Button} rightIcon={<SettingsIcon />}>
                      Settings
                    </MenuButton>
                    <MenuList>
                      <MenuItem as={Button} rightIcon={<EditIcon />}>
                        Profile
                      </MenuItem>
                      <MenuItem as={Button} rightIcon={<ExternalLinkIcon />}>
                        SignOut
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </>
              ) : (
                <>
                  <Button w={"100%"} colorScheme="teal" variant="outline">
                    <LoginUser />
                  </Button>
                  <Button w={"100%"} colorScheme="teal" variant="solid">
                    <CreateUser />
                  </Button>
                </>
              )}
            </Button>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
