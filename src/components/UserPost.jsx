import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import Action from "./Action";
import { useState } from "react";

const UserPost = ({ likes, replies, postImg, postTitle }) => {
  const [liked, setLiked] = useState(false);

  return (
    <>
      <Link to={"/zuck/post/1"}>
        <Flex gap={3} mb={4} py={5}>
          <Flex flexDirection={"column"} alignItems={"center"}>
            <Avatar size="md" name="Mark Zuckerberg" src="/zuck-avatar.png" />
            <Box w="1px" h={"full"} bg="gray.light" my={2}></Box>
            <Box position={"relative"} w={"full"}>
              <Avatar
                size="xs"
                name="John doe"
                src="https://bit.ly/dan-abramov"
                position={"absolute"}
                top={"0px"}
                left="13px"
                padding={"2px"}
              />
              <Avatar
                size="xs"
                name="Tom"
                src="https://bit.ly/sage-adebayo"
                position={"absolute"}
                bottom={"0px"}
                right="-4px"
                padding={"2px"}
              />
              <Avatar
                size="xs"
                name="Antony"
                src="https://bit.ly/prosper-baba"
                position={"absolute"}
                bottom={"0px"}
                left="-3px"
                padding={"2px"}
              />
            </Box>
          </Flex>
          <Flex gap={2} flexDirection={"column"} flex={1}>
            <Flex justifyContent={"space-between"} w={"full"}>
              <Flex w={"full"} alignItems={"center"}>
                <Text fontSize={"small"} fontWeight={"bold"}>
                  Mark Zuckerberg
                </Text>
                <Image src="/verified.png" w={4} h={4} ml={1} />
              </Flex>
              <Flex gap={4} alignItems={"center"}>
                <Text fontStyle={"sm"}>1d</Text>
                <BsThreeDots />
              </Flex>
            </Flex>
            <Text fontSize={"small"}>{postTitle}</Text>
            {postImg && (
              <Box
                borderRadius={6}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"gray.light"}
              >
                <Image src={postImg} w={"full"} />
              </Box>
            )}

            <Flex gap={3} my={1}>
              <Action liked={liked} setLiked={setLiked} />
            </Flex>
            <Flex gap={2} alignItems={"center"}>
              <Text fontSize={"small"}>{replies} replies</Text>
              <Text fontSize="sm">{likes} likes</Text>
            </Flex>
          </Flex>
        </Flex>
      </Link>
    </>
  );
};

export default UserPost;
