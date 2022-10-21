import React, { useContext, createContext, useState } from "react";
import jwt from "jwt-decode";
import api from "../api";
import { useAlert } from "./alert";

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
  const [signInError, setSignInError] = useState();
  const { emitAlert, ALERT_TYPES } = useAlert();

  const signIn = async ({ email, password }) => {
    const { data } = await api.login({ email, password }).catch((err) => {});
    localStorage.setItem("todo:token", data);
    setToken(data);
    emitAlert({ type: ALERT_TYPES.SUCCESS, message: "Logged" });
  };

  return {
    signIn,
    token,
    user,
  };
}

export { ProvideAuth, useAuth };
