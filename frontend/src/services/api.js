import axios from "axios"; 

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// If your .env = http://localhost:5000
export const askAI = (prompt) =>
  API.post("/api/ask-ai", { prompt });

export const saveData = (data) =>
  API.post("/api/save", data);