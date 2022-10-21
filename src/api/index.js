import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.headers.common["Authorization"] = localStorage.getItem(
  "todo:token"
)
  ? `Bearer ${localStorage.getItem("todo:token")}`
  : null;

const login = async ({ email, password }) => {
  return await axios.get("/auth/login", { params: { email, password } });
};

const createUser = async ({ name, email, password }) => {
  return await axios.post("/users", { name, email, password });
};

const getProjects = async () => {
  return await axios.get(`/projects`);
};

const getProject = async ({ id }) => {
  return await axios.get(`/projects/${id}`);
};

const updateProject = async ({ id, name }) => {
  return await axios.put(`/projects/${id}`, { name, id });
};

const createProject = async ({ name }) => {
  return await axios.post("/projects", { name });
};

const deleteProject = async ({ id }) => {
  return await axios.delete(`/projects/${id}`);
};

const createTask = async ({ description, projectId }) => {
  return await axios.post("/tasks", { description, projectId });
};

const updateTasksInBatch = async ({ tasks, status }) => {
  return await axios.put("/tasks", { tasks, status });
};

const updateTask = async ({ description, id }) => {
  return await axios.put(`/tasks/${id}`, { description, id });
};

const deleteTask = async ({ id }) => {
  return await axios.delete(`/tasks/${id}`);
};

const api = {
  login,
  createUser,
  getProjects,
  getProject,
  updateProject,
  createProject,
  deleteProject,
  createTask,
  updateTasksInBatch,
  updateTask,
  deleteTask,
};

export default api;
