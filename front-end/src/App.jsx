import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";
import { useEffect, useContext } from "react";
import { NewPost } from "./components";

const HomePage = () => {
  const { state, login } = useContext(AuthContext);

  return (
    <div>
      <Header />

      <Outlet />
    </div>
  );
};

export default HomePage;
