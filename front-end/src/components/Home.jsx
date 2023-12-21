import { useEffect, useState } from "react";
import NewPost from "./NewPost";
import NewUsers from "./NewUsers";
import Post from "./Post";
import axios from "axios";
import Loader from "react-loaders";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/posts`,
        { withCredentials: true }
      );
      setPosts(response.data.posts);
      setLoading(false);
    };
    fetchPosts();
  }, [posts]);

  const handleNewPost = async (content) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/posts/create`,
      {
        content: content,
      },
      { withCredentials: true }
    );
    setPosts([response.data.post, ...posts]);
  };
  return (
    <div className="flex w-full max-w-4xl m-auto mt-8 gap-8">
      <div className="flex-[2]">
        <NewPost handleNewPost={handleNewPost} />
        <div className="m-4">
          {loading && <Loader type="ball-pulse" />}
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </div>
      <div className="flex-[1]">
        <NewUsers />
      </div>
    </div>
  );
};

export default Home;
