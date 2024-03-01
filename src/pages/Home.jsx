import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Loading from "../components/Loading";
import { Text } from "@chakra-ui/react";
import Post from "../components/Post";

const Home = () => {
  const showTost = useShowToast();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getHomePosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://threads-app-oa3m.onrender.com/api/feedpost");
        const data = await response.json();
        if (data.error) {
          showTost("Error", data.error, "error");
          return;
        }
        setPosts(data);
      } catch (error) {
        showTost("Error", error, "error");
      } finally {
        setLoading(false);
      }
    };
    getHomePosts();
  }, []);

  return (
    <>
      {loading && <Loading />}
      {!loading && posts.length === 0 && (
        <Text textAlign={"center"} mt={10}>
          No Posts Please Follow Someone
        </Text>
      )}
      {posts?.map((post) => (
        <Post key={post._id} post={post} userid={post.postedBy} />
      ))}
    </>
  );
};

export default Home;
