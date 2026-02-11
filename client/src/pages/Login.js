import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaSignInAlt, FaSpinner } from "react-icons/fa"; // Professional icons; install react-icons if needed

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
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
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome to VendorVerify</h2>
        <FaSignInAlt style={styles.icon} />

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.inputContainer}>
          <FaUser style={styles.inputIcon} />
          <input
            style={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email"
          />
        </div>

        <div style={styles.inputContainer}>
          <FaLock style={styles.inputIcon} />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
          />
        </div>

        <button style={loading ? { ...styles.button, ...styles.buttonLoading } : styles.button} onClick={handleLogin} disabled={loading}>
          {loading ? <FaSpinner style={styles.spinner} /> : "Login"}
        </button>

        <p style={styles.registerText}>
          Don’t have an account?{" "}
          <span
            style={styles.link}
            onClick={() => navigate("/register")}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
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
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", // Subtle blue-gray gradient
    backgroundSize: "400% 400%",
    animation: "gradientShift 10s ease infinite", // Gentle animation
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    width: "350px",
    maxWidth: "90%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)", // Soft, professional shadow
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "translateY(-2px)", // Subtle lift
    },
  },
  title: {
    textAlign: "center",
    color: "#2c3e50",
    fontSize: "24px",
    fontWeight: "600",
    margin: 0,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // Clean font
  },
  icon: {
    alignSelf: "center",
    color: "#3498db",
    fontSize: "36px",
    marginBottom: "10px",
  },
  error: {
    color: "#e74c3c",
    textAlign: "center",
    fontSize: "14px",
    margin: 0,
  },
  inputContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: "15px",
    color: "#7f8c8d",
    fontSize: "18px",
  },
  input: {
    width: "100%",
    padding: "15px 15px 15px 45px",
    border: "1px solid #bdc3c7",
    borderRadius: "8px",
    fontSize: "16px",
    transition: "border-color 0.3s ease",
    "&:focus": {
      borderColor: "#3498db",
      outline: "none",
    },
  },
  button: {
    background: "#3498db",
    color: "white",
    border: "none",
    padding: "15px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.3s ease",
    "&:hover": {
      background: "#2980b9",
    },
  },
  buttonLoading: {
    cursor: "not-allowed",
    opacity: 0.7,
  },
  spinner: {
    animation: "spin 1s linear infinite",
    fontSize: "16px",
  },
  registerText: {
    textAlign: "center",
    fontSize: "14px",
    color: "#7f8c8d",
    margin: 0,
  },
  link: {
    color: "#3498db",
    cursor: "pointer",
    fontWeight: "500",
    transition: "color 0.3s ease",
  },
};


export default Login;


