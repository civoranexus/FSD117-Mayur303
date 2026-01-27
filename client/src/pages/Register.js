import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { registerUser } from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("vendor");

  const handleRegister = async () => {
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
      alert("Registration failed");
    }
  };

  return (
    <Layout>
      <div style={styles.card}>
        <h2>Register User</h2>

        <input
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <select onChange={(e) => setRole(e.target.value)}>
          <option value="vendor">Vendor</option>
          <option value="verifier">Verifier</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={handleRegister}>Register</button>
      </div>
    </Layout>
  );
}

const styles = {
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    maxWidth: "400px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
  },
};

export default Register;

