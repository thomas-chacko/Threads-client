import {
  Avatar,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import useShowToast from "../hooks/useShowToast";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const showTost = useShowToast();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`https://threads-app-oa3m.onrender.com/api/user/search?query=${search}`);
        const data = await response.json();
        if (data.error) {
          showTost("Error", data.error, "error");
          return;
        }
        setUsers(data);
      } catch (error) {
        showTost(
          "Error",
          "An error occurred while fetching user data.",
          "error"
        );
      }
    };

    if (search.trim() !== "") {
      fetchUsers();
    } else {
      setUsers([]);
    }
  }, [search]);

  const handleShowUser = async (user) => {
    try {
      const response = await fetch(`https://threads-app-oa3m.onrender.com/api/user/profile/${user}`);
      const data = await response.json();
      if (data.error) {
        showTost("Error", data.error, "error");
        return;
      }
      setSearch("");
      onClose();
      navigate(`/${user}`);
    } catch (error) {
      showTost("Error", error, "error");
    }
  };
  return (
    <>
      <FaSearch size={25} cursor={"pointer"} onClick={onOpen} />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap={2}>
              <Input
                placeholder="Search user"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Flex>
            {users.map((user) => (
              <Flex
                key={user._id}
                mt={8}
                alignItems={"center"}
                justifyContent={"space-between"}
                mb={5}
                onClick={() => handleShowUser(user.username)}
              >
                <Avatar size={"sm"} src={user.profilePicture} />
                <Text>{user.name}</Text>
              </Flex>
            ))}
            {search.trim() !== "" && users.length === 0 && (
              <Text mt={4}>No users found.</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchBox;
