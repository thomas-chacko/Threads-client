import {
  Button,
  Flex,
  FormControl,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import usePreviewimg from "../hooks/usePreviewimg";
import { BsFillImageFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import useShowToast from "../hooks/useShowToast";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setPostText] = useState("");
  let MAX_LETTER = 500;
  const [remaningLetter, setRemaningLetter] = useState(0);
  const { handleImageChange, imageUrl, setImageUrl } = usePreviewimg();
  const showTost = useShowToast();
  const [updating, setUpdating] = useState(false);

  const fileRef = useRef(null);
  const user = useRecoilValue(userAtom);

  const handleChange = (e) => {
    const value = e.target.value;
    setPostText(value);
    setRemaningLetter(value.length);
  };

  const handleCreatePost = async () => {
    setUpdating(true);
    try {
      if (postText.length > MAX_LETTER) {
        showTost("Error", "The Character Must be lessthan 500", "error");
        return;
      }
      const response = await fetch("https://threads-app-oa3m.onrender.com/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postedBy: user._id,
          text: postText,
          image: imageUrl,
        }),
        credentials: "include",
      });
      const data = await response.json();
      if (data.error) {
        showTost("Error", data.error, "error");
        return;
      }
      showTost("Success", "Post created successfully", "success");
      onClose();
      setPostText("");
      setImageUrl("");
      setRemaningLetter(0);
    } catch (error) {
      showTost("Error", error, "error");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      <Button
        position={"fixed"}
        bottom={{ base: 5, md: 10 }}
        right={{ base: 5, md: 10 }}
        onClick={onOpen}
        leftIcon={<FaPlus />}
      >
        create
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder="post your threds hear..."
                onChange={handleChange}
                value={postText}
              />
              <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                mt={2}
                p={1}
              >
                <Text fontSize={"sm"} textAlign={"right"} color={"gray.400"}>
                  <span>{remaningLetter}</span> / 500
                </Text>
                <Input
                  type="file"
                  hidden
                  ref={fileRef}
                  onChange={handleImageChange}
                />
                <BsFillImageFill
                  onClick={() => fileRef.current.click()}
                  cursor={"pointer"}
                />
              </Flex>
            </FormControl>
            {imageUrl && (
              <Flex mt={5} w={"full"} position={"relative"}>
                <Image src={imageUrl} w={"full"} />
                <IoCloseSharp
                  style={{
                    position: "absolute",
                    top: "10",
                    right: "10",
                    background: "black",
                    color: "white",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                  size={20}
                  onClick={() => setImageUrl("")}
                />
              </Flex>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={updating}
              colorScheme="blue"
              mr={3}
              onClick={handleCreatePost}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
