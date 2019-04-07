import axios from "axios";

export const authInstance = axios.create({
  baseURL: "https://www.googleapis.com/identitytoolkit/v3/relyingparty",
  timeout: 5000,
  headers: { "Content-Type": "application/json" }
});
