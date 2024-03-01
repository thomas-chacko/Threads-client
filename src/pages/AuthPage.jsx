import { useRecoilValue } from "recoil";
import authAtom from "../atoms/authAtom";
import Login from "./Login";
import Signup from "./Signup";

const AuthPage = () => {
  const authState = useRecoilValue(authAtom);
  return <>{authState === "login" ? <Login /> : <Signup />}</>;
};

export default AuthPage;
