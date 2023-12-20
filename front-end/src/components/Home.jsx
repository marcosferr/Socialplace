import NewPost from "./NewPost";
import NewUsers from "./NewUsers";

const Home = () => {
  return (
    <div className="flex w-full max-w-4xl m-auto mt-8 gap-8">
      <div className="flex-[2]">
        <NewPost />
      </div>
      <div className="flex-[1]">
        <NewUsers />
      </div>
    </div>
  );
};

export default Home;
