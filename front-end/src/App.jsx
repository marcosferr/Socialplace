import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { state } = useContext(AuthContext);
  const { user } = state;

  useEffect(() => {
    console.log("user", user);
  }, [user]);
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default HomePage;
