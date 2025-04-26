import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4004",
});

export default api;
