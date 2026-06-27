import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development"
  ? "http://localhost:8001"
  : "https://voxa-ai-iqlf.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

export default api;