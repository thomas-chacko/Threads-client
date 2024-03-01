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
import { FaEye } from "react-icons/fa6";
import { useSetRecoilState } from "recoil";
import authAtom from "../atoms/authAtom";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";

const Login = () => {
  const showTost = useShowToast();
  // inputs data
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  // password show and hide state
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  // setter function for update the state
  const setAuth = useSetRecoilState(authAtom);
  const setUser = useSetRecoilState(userAtom);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch(
        "https://threads-app-oa3m.onrender.com/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputs),
          credentials: "include",
        }
      );
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
        marginTop={"100px"}
      >
        <Text textAlign={"center"} fontSize={"35px"}>
          Login
        </Text>
        <Box>
          <FormLabel>username *</FormLabel>
          <Input
            required
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
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
        <Button isLoading={loading} loadingText="loging in..." type="submit">
          Login
        </Button>
        <Flex gap={2} marginTop={2}>
          <Text>Dont &apos;t have an account ?</Text>
          <Link onClick={() => setAuth("signup")} color={"blue.500"}>
            signup
          </Link>
        </Flex>
      </Flex>
    </form>
  );
};
export default Login;
