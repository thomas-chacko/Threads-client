import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const showTost = useShowToast();
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://threads-app-oa3m.onrender.com/api/user/profile/${username}`,{
          credentials: "include",
        });
        const data = await response.json();
        if (data.error) {
          showTost("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showTost("Error", error, "error");
      }
    };
    fetchData();

    const getPost = async () => {
      try {
        const response = await fetch(`https://threads-app-oa3m.onrender.com/api/userpost/${username}`,{
          credentials: "include",
        });
        const data = await response.json();
        setPost(data);
      } catch (error) {
        showTost("Error", error, "error");
      }
    };
    getPost();
  }, [username]);

  if (!user) {
    return null;
  }

  return (
    <>
      <UserHeader user={user} />
      {post?.length === 0 && (
        <h1
          style={{ textAlign: "center", marginTop: "100px", fontSize: "30px" }}
        >
          No post Yet !!
        </h1>
      )}
      {post?.map((post) => (
        <Post key={post._id} post={post} userid={post.postedBy} />
      ))}
    </>
  );
};
export default UserPage;
