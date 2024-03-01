import {
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import lightLogo from "/light-logo.svg";
import darkLogo from "/public/dark-logo.svg";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import CreatePost from "./CreatePost";
import { FaUser } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";


const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const setUser = useSetRecoilState(userAtom);
  const showTost = useShowToast();

  const handleLogout = async () => {
    try {
      const response = await fetch("https://threads-app-oa3m.onrender.com/api/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.error) {
        showTost("Error", data.error, "error");
      }
      sessionStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      showTost("Error", error, "error");
    }
  };
  return (
    <>
      <Flex justifyContent={"space-between"} mt={6} mb={12}>
        <Image
          cursor={"pointer"}
          src={colorMode === "light" ? darkLogo : lightLogo}
          onClick={toggleColorMode}
          alt="logo"
          width={"30px"}
        />
        {user && <CreatePost />}
        <Flex alignItems={"center"} gap={4}>
          <SearchBox />
          {user && (
            <Menu>
              <MenuButton as={Button} rightIcon={<FaUser />}>
                {user.username}
              </MenuButton>
              <MenuList>
                <MenuItem as={Link} to={`/${user.username}`} minH="48px">
                  <Image
                    boxSize="2rem"
                    borderRadius="full"
                    src={user.profilePicture}
                    alt={user.name}
                    mr="12px"
                  />
                  <span>{user.name}</span>
                </MenuItem>
                <MenuItem minH="40px" onClick={handleLogout}>
                  <FiLogOut
                    size={25}
                    style={{ marginRight: "15px", marginLeft: "8px" }}
                  />
                  <span>logout</span>
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>
    </>
  );
};
export default Header;
