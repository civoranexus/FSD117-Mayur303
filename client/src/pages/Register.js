import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { registerUser } from "../services/api";
import { FaUser, FaEnvelope, FaLock, FaUserTag, FaUserPlus, FaSpinner } from "react-icons/fa"; // Professional icons; install react-icons if needed

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("vendor");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    try {
      await registerUser({
        name,
        email,
        password,
        role,
      });

      alert("User registered successfully");
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h2 style={styles.title}>Register for VendorVerify</h2>
          <FaUserPlus style={styles.icon} />

          {error && <p style={styles.error}>{error}</p>}

          <div style={styles.inputContainer}>
            <FaUser style={styles.inputIcon} />
            <input
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="Full Name"
            />
          </div>

          <div style={styles.inputContainer}>
            <FaEnvelope style={styles.inputIcon} />
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

          <div style={styles.selectContainer}>
            <FaUserTag style={styles.selectIcon} />
            <select
              style={styles.select}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              aria-label="Role"
            >
              <option value="vendor">Vendor</option>
              <option value="verifier">Verifier</option>
            </select>
          </div>

          <button style={loading ? { ...styles.button, ...styles.buttonLoading } : styles.button} onClick={handleRegister} disabled={loading}>
            {loading ? <FaSpinner style={styles.spinner} /> : "Register"}
          </button>
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", // Matching subtle gradient
    backgroundSize: "400% 400%",
    animation: "gradientShift 10s ease infinite",
    padding: "20px",
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    maxWidth: "450px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "translateY(-2px)",
    },
  },
  title: {
    textAlign: "center",
    color: "#2c3e50",
    fontSize: "24px",
    fontWeight: "600",
    margin: 0,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
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
  selectContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  selectIcon: {
    position: "absolute",
    left: "15px",
    color: "#7f8c8d",
    fontSize: "18px",
    zIndex: 1,
  },
  select: {
    width: "100%",
    padding: "15px 15px 15px 45px",
    border: "1px solid #bdc3c7",
    borderRadius: "8px",
    fontSize: "16px",
    background: "white",
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
};


export default Register;

