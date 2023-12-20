import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Login,
  Register,
  ForgotPassword,
  MyProfile,
  ResetPassword,
} from "./pages/index.js";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { PrivateRoute } from "./components/index.js";
import Home from "./components/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/me",
        element: <MyProfile />,
      },
      { path: "/", element: <Home /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  { path: "register", element: <Register /> },
  { path: "forgot-password", element: <ForgotPassword /> },
  { path: "password-reset/:token", element: <ResetPassword /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
