import React, { createContext, useReducer } from "react";
import authReducer from "../reducers/authReducer.js";

// Create the initial state for the auth context
const initialState = {
  isAuthenticated: false,
  user: null,
};

// Create the Auth Context
export const AuthContext = createContext();

// Create the Auth Provider component
export const AuthProvider = ({ children }) => {
  // Use the authReducer to manage the state
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Define your dispatchers here
  const login = (user) => {
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  // Provide the state and dispatchers to the children components
  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
