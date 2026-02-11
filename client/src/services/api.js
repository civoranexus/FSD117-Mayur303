import axios from "axios";

const API = axios.create({
  baseURL: "https://fsd117-mayur303.onrender.com/api",
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
  axios.post("https://fsd117-mayur303.onrender.com/api/auth/register", data);

export const getQrGenerationLogs = (token) =>
  axios.get("/api/admin/qr-generation-logs", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getQrVerificationLogs = (token) =>
  axios.get("/api/admin/qr-verification-logs", {
    headers: { Authorization: `Bearer ${token}` },
  });
