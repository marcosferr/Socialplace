import axios from "axios";
import { useState } from "react";
const NewPost = ({ handleNewPost }) => {
  const [content, setContent] = useState("");

  return (
    <div className="relative">
      <textarea
        type="text"
        className="flex-1 shadow-md selection:border-blue-300 w-full"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="rounded-2xl bg-blue-400 font-bold absolute bottom-4 right-4 p-3"
        onClick={() => {
          handleNewPost(content);
        }}
      >
        Post
      </button>
    </div>
  );
};

export default NewPost;
