import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const loginUser = (data) => API.post("/auth/login", data);

export const generateQR = (data, token) =>
  API.post("/qr/generate", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  export const verifyQR = (data, token) =>
  API.post("/scan/verify", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const registerUser = (data) =>
  axios.post("http://localhost:5000/api/auth/register", data);
