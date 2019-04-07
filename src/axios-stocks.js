import axios from "axios";

export const stocksInstance = axios.create({
  baseURL: "http://localhost:4001/",
  timeout: 5000,
  headers: { "Content-Type": "application/json" }
});
