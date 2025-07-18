import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      config.headers["Authorization"] = "Bearer " + user.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
