import React, { useContext, createContext, useState } from "react";
import jwt from "jwt-decode";
import api from "../api";

const authContext = createContext();

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [token, setToken] = useState(localStorage.getItem("todo:token"));
  const [user, setUser] = useState(token ? jwt(token).user : "");

  const signIn = async ({ email, password }) => {
    const { data } = await api.login({ email, password });
    localStorage.setItem("todo:token", data);
    setToken(data);
  };

  return {
    signIn,
    token,
    user,
  };
}

export { ProvideAuth, useAuth };
