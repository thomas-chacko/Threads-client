import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Text,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { useSetRecoilState } from "recoil";
import authAtom from "../atoms/authAtom";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";

const Signup = () => {
  const showTost = useShowToast();

  // inputs datas
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  // password show and hide state
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  // setter function for update the state
  const setAuth = useSetRecoilState(authAtom);
  const setUser = useSetRecoilState(userAtom);

  const [loading, setLoading] = useState(false);

  // submit the form and send the data to the server
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await response.json();
      if (data.error) {
        showTost("Error", data.error, "error");
        return;
      }
      // store the data to localstorage
      sessionStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      showTost("Error", error, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        maxWidth={"400px"}
        margin={"auto"}
        flexDirection={"column"}
        gap={4}
        marginTop={25}
      >
        <Text textAlign={"center"} fontSize={"35px"}>
          Signup
        </Text>
        <Box>
          <FormLabel>name *</FormLabel>
          <Input
            required
            value={inputs.name}
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
          />
        </Box>
        <Box>
          <FormLabel>username *</FormLabel>
          <Input
            required
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          />
        </Box>
        <Box>
          <FormLabel>email *</FormLabel>
          <Input
            required
            type="email"
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />
        </Box>
        <Box position={"relative"}>
          <FormLabel>password *</FormLabel>
          <Input
            required
            type={show ? "text" : "password"}
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
          <FaEye
            style={{
              position: "absolute",
              right: "10px",
              top: "43px",
              cursor: "pointer",
              zIndex: "10",
            }}
            onClick={handleClick}
          />
        </Box>
        <Button isLoading={loading} loadingText='sign up...' type="submit">
          Signup
        </Button>
        <Flex gap={2} marginTop={2}>
          <Text>Already have an account ?</Text>
          <Link onClick={() => setAuth("login")} color={"blue.500"}>
            login
          </Link>
        </Flex>
      </Flex>
    </form>
  );
};

export default Signup;
