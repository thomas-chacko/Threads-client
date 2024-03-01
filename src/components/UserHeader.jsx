import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaInstagram } from "react-icons/fa6";
import { CgMoreO } from "react-icons/cg";
import { FaLink } from "react-icons/fa6";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link } from "react-router-dom";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast";

const UserHeader = ({ user }) => {
  const currentUser = useRecoilValue(userAtom);
  const showTost = useShowToast();
  const [follow, setFollow] = useState(
    user.followers.includes(currentUser._id)
  );
  const [updating, setUpdating] = useState(false);

  const copyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      showTost("OK", "Profile link copied.", "success");
    });
  };

  const handleFollow = async () => {
    if (!currentUser) {
      showTost("Error", "please login to follow", "error");
      return;
    }
    if (updating) return;
    setUpdating(true);
    try {
      const response = await fetch(`https://threads-app-oa3m.onrender.com/api/user/follow/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setFollow(!follow);
      if (data.error) {
        showTost("Error", data.error, "error");
      }
      if (follow) {
        showTost("Success", `Un Followed ${user.name}`, "success");
        user.followers.pop();
      } else {
        showTost("Success", `Followed ${user.name}`, "success");
        user.followers.push(currentUser?._id);
      }
    } catch (error) {
      showTost("Error", error, "error");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <VStack gap={4} alignItems={"start"}>
      {/* name and photos */}
      <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {user?.name}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>{user?.username}</Text>
            <Text
              fontSize={"xs"}
              bg={"gray.dark"}
              color={"gray.light"}
              py={1}
              px={3}
              borderRadius={"full"}
            >
              threads.net
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar
            size={{ base: "lg", md: "xl" }}
            name="Mark Zuckerberg"
            src={user?.profilePicture}
          />
        </Box>
      </Flex>
      <Text>{user?.bio}</Text>
      {currentUser?._id === user?._id ? (
        <Link to="/update">
          <Button>update profile</Button>
        </Link>
      ) : (
        <Button onClick={handleFollow} isLoading={updating}>
          {follow ? "Unfollow" : "Follow"}
        </Button>
      )}
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={5} alignItems={"center"}>
          <Text>{user?.followers.length} followers</Text>
          <Text>{user.following.length} Following</Text>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <FaInstagram size={30} cursor={"pointer"} />
          <Menu>
            <MenuButton>
              <CgMoreO size={27} cursor={"pointer"} />
            </MenuButton>
            <Portal>
              <MenuList bg={"black"} color={"white"}>
                <MenuItem bg={"black"} color={"white"} onClick={copyUrl}>
                  <Flex alignItems={"center"} gap={100}>
                    copy profile link
                    <FaLink />
                  </Flex>
                </MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        </Flex>
      </Flex>
      {/* threds and replies */}
      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"1px solid white"}
          justifyContent={"center"}
          pb={3}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Threds</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1px solid gray"}
          justifyContent={"center"}
          pb={3}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"} color={"gray"}>
            Replies
          </Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
