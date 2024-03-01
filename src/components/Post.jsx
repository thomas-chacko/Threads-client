import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Action from "./Action";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { formatDistanceToNow } from "date-fns";
import { FaTrash } from "react-icons/fa6";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const Post = ({ post, userid }) => {
  const [user, setUser] = useState(null);
  const currentUser = useRecoilValue(userAtom);

  const showTost = useShowToast();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          "https://threads-app-oa3m.onrender.com/api/user/profile/" + userid,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.error) {
          showTost("Error", data.error, "error");
        }
        setUser(data);
      } catch (error) {
        showTost("Error", error, "error");
        setUser(null);
      }
    };
    getUser();
  }, [userid]);

  const handleDeletePost = async (e) => {
    e.preventDefault();
    try {
      const conform = window.confirm("Are you sure?");
      if (!conform) return;
      const response = await fetch(
        `https://threads-app-oa3m.onrender.com/api/post/${post._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.error) {
        showTost("Error", data.error, "error");
        return;
      }
      showTost("Success", "Post deleted successfully", "success");
    } catch (error) {
      showTost("Error", error, "error");
    }
  };
  return (
    <>
      <Link to={`/${user?.username}/post/${post._id}`}>
        <Flex gap={3} mb={4} py={5}>
          <Flex flexDirection={"column"} alignItems={"center"}>
            <Avatar
              onClick={(e) => {
                e.preventDefault();
                navigate(`/${user?.username}`);
              }}
              size="md"
              name={user?.name}
              src={user?.profilePicture}
            />
            <Box w="1px" h={"full"} bg="gray.light" my={2}></Box>
            <Box position={"relative"} w={"full"}>
              {post.replies.length === 0 && (
                <Text textAlign={"center"}>🥱</Text>
              )}
              {post.replies[0] && (
                <Avatar
                  size="xs"
                  name="John doe"
                  src={post.replies[0].userProfilePicture}
                  position={"absolute"}
                  top={"0px"}
                  left="13px"
                  padding={"2px"}
                />
              )}

              {post.replies[1] && (
                <Avatar
                  size="xs"
                  name="Antony"
                  src={post.replies[1].userProfilePicture}
                  position={"absolute"}
                  bottom={"0px"}
                  left="-3px"
                  padding={"2px"}
                />
              )}

              {post.replies[2] && (
                <Avatar
                  size="xs"
                  name="Antony"
                  src={post.replies[2].userProfilePicture}
                  position={"absolute"}
                  bottom={"0px"}
                  left="28px"
                  padding={"2px"}
                />
              )}
            </Box>
          </Flex>
          <Flex gap={2} flexDirection={"column"} flex={1}>
            <Flex justifyContent={"space-between"} w={"full"}>
              <Flex w={"full"} alignItems={"center"}>
                <Text fontSize={"small"} fontWeight={"bold"}>
                  {user?.username}
                </Text>
                <Image src="/verified.png" w={4} h={4} ml={1} />
              </Flex>
              <Flex gap={4} alignItems={"center"}>
                <Text
                  fontSize={"sm"}
                  width={36}
                  textAlign={"right"}
                  color={"gray.500"}
                >
                  {formatDistanceToNow(new Date(post.createdAt))} ago
                </Text>
                {currentUser?._id === user?._id && (
                  <FaTrash onClick={handleDeletePost} />
                )}
              </Flex>
            </Flex>
            <Text fontSize={"small"}>{post?.text}</Text>
            {post?.image && (
              <Box
                borderRadius={6}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"gray.light"}
              >
                <Image src={post?.image} w={"full"} />
              </Box>
            )}

            <Flex gap={3} my={1}>
              <Action post={post} />
            </Flex>
          </Flex>
        </Flex>
      </Link>
    </>
  );
};

export default Post;
