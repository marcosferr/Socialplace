import axios from "axios";
const NewPost = () => {
  const handleNewPost = () => {
    axios.post("http://localhost:3001/posts", {
      username: "test",
      desc: "test",
      img: "test",
      likes: 0,
    });
  };

  return (
    <div className="relative">
      <textarea
        type="text"
        className="flex-1 shadow-md selection:border-blue-300 w-full"
        placeholder="What's on your mind?"
      />
      <button
        className="rounded-2xl bg-blue-400 font-bold absolute bottom-4 right-4 p-3"
        onClick={handleNewPost}
      >
        Post
      </button>
    </div>
  );
};

export default NewPost;
