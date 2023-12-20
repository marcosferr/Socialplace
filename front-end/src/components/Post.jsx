const Post = () => {
  return (
    <div className="flex-row">
      <div className="rounded-full w-5 bg-slate-50"></div>
      <div className="font-bold">Example User</div>
      <div className="text-sm">1 hour ago</div>
      <div className="justify-self-end">Delete</div>
    </div>
  );
};

export default Post;
