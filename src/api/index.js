import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/";

const login = async ({ email, password }) => {
  return await axios.get("/auth/login", { params: { email, password } });
};

const createUser = async ({ name, email, password }) => {
  return await axios.post("/users", { name, email, password });
};

const api = {
  login,
  createUser,
};

export default api;
