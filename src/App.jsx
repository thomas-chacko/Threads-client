import { Container } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import UpdateProfile from "./pages/UpdateProfile";

const App = () => {
  const user = useRecoilValue(userAtom);

  return (
    <Container maxW={"1200px"}>
      <Header />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to={"/auth"} />} />
        <Route
          path="/auth"
          element={user ? <Navigate to={"/"} /> : <AuthPage />}
        />
        <Route
          path="/update"
          element={user ? <UpdateProfile /> : <Navigate to={"/auth"} />}
        />
        <Route
          path="/:username"
          element={user ? <UserPage /> : <Navigate to={"/auth"} />}
        />
        <Route
          path="/:username/post/:pid"
          element={user ? <PostPage /> : <Navigate to={"/auth"} />}
        />
      </Routes>
    </Container>
  );
};

export default App;
