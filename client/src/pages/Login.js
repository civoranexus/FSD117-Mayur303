import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email, password });

      const token = res.data.token;
      localStorage.setItem("token", token);

      // 🔥 Decode JWT to get role
      const payload = JSON.parse(atob(token.split(".")[1]));
      const role = payload.role;

      // 🔀 Role-based redirect
      if (role === "vendor") {
        navigate("/vendor");
      } else if (role === "verifier") {
        navigate("/verifier");
      } else if (role === "admin") {
        navigate("/admin");
      }
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2>Login</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
        <p style={{ textAlign: "center" }}>
  Don’t have an account?{" "}
  <span
    style={styles.link}
    onClick={() => navigate("/register")}
  >
    Register
  </span>
</p>

      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
  },
  link: {
  color: "#2563eb",
  cursor: "pointer",
  fontWeight: "500",
},

};

export default Login;


