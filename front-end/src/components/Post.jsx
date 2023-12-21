import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";

const Post = ({ post }) => {
  const [likes, setLikes] = useState(post.likes.length);
  const [liked, setLiked] = useState(false);
  const timeAgo = formatDistanceToNow(new Date(post.createdAt));

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="flex flex-col items-start gap-4 bg-slate-100 rounded-lg my-4 p-4 shadow-xl">
      <h2 className="text-lg font-semibold mb-2">
        {post.postedBy.username} posted {timeAgo} ago
      </h2>

      <p className="text-base mb-2">{post.content}</p>

      <div className="flex items-center gap-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleLike}
        >
          {liked ? "Unlike" : "Like"}
        </button>
        <span className="text-gray-700">{likes}</span>
      </div>
    </div>
  );
};

export default Post;
