import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";

const Comment = ({ replies }) => {
  return (
    <>
      {replies?.length === 0 && (
        <Flex
          gap={4}
          py={2}
          my={2}
          justifyContent={"space-between"}
          w={"full"}
          alignItems={"center"}
        >
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              No replies yet
            </Text>
          </Flex>
        </Flex>
      )}
      {replies?.map((item, i) => (
        <Flex
          gap={4}
          py={2}
          my={2}
          justifyContent={"space-between"}
          w={"full"}
          alignItems={"center"}
          key={i}
        >
          <Flex gap={2} alignItems={"center"}>
            <Avatar src={item.userProfilePicture} size={"sm"} />
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {item.username}
            </Text>
          </Flex>
          <Flex gap={1} w={"full"} flexDirection={"column"}>
            <Text fontSize={"sm"} fontWeight={"bold"} textAlign={"right"}>
              {item.text}
            </Text>
          </Flex>
        </Flex>
      ))}
      <Divider />
    </>
  );
};
export default Comment;
