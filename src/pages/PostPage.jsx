import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { useEffect, useState } from "react";
import Comment from "../components/Comment";
import useShowToast from "../hooks/useShowToast";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const [user, setUser] = useState(null);
  const [post, setPost] = useState([]);

  const showTost = useShowToast();
  const { username } = useParams();
  const { pid } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`/api/user/profile/${username}`);
        const data = await response.json();
        if (data.error) {
          showTost("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showTost(
          "Error",
          "An error occurred while fetching user data.",
          "error"
        );
      }
    };
    getUser();

    const getPost = async () => {
      try {
        const response = await fetch(`/api/post/${pid}`);
        const data = await response.json();
        if (data.error) {
          showTost("Error", data.error, "error");
          return;
        }
        setPost(data);
      } catch (error) {
        showTost(
          "Error",
          "An error occurred while fetching post data.",
          "error"
        );
      }
    };
    getPost();
  }, [username]);

  if (!post) {
    return null;
  }

  return (
    <>
      <Flex>
        <Flex
          w={"full"}
          gap={3}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Flex alignItems={"center"}>
            <Avatar
              size="md"
              name={user?.username}
              src={user?.profilePicture}
            />
            <Text fontSize={"sm"} fontWeight={"bold"} marginLeft={"5px"}>
              {user?.username}
            </Text>
            <Image src="/verified.png" w={4} h={4} ml={1} alt="verified" />
          </Flex>
          <Flex gap={4} alignItems={"center"}>
            <BsThreeDots />
          </Flex>
        </Flex>
      </Flex>
      <Text my={3}>{post?.text}</Text>
      <Box
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"gray.light"}
      >
        {post?.image && <Image src={post?.image} w={"full"} />}
      </Box>
      <Flex gap={2} alignItems={"center"} mt={4}>
        <Text fontSize={"sm"} fontWeight={"bold"}>
          {post?.likes?.length} Likes
        </Text>
        <Text fontSize={"sm"}>{post?.replies?.length} Replies</Text>
      </Flex>
      <Divider my={5} />
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>✌️</Text>
          <Text>Get the app to like reply and post.</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider my={5} />
      <Comment replies={post?.replies} />
    </>
  );
};
export default PostPage;
