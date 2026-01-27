import { useState } from "react";
import { verifyQR } from "../services/api";
import Layout from "../components/Layout";

function Verifier() {
  const [qrToken, setQrToken] = useState("");
  const [result, setResult] = useState(null);

  const handleVerify = async () => {
    try {
      const jwt = localStorage.getItem("token");
      const res = await verifyQR({ token: qrToken }, jwt);
      setResult(res.data);
    } catch {
      setResult({ status: "INVALID", message: "Verification failed" });
    }
  };

  const getResultStyle = () => {
    if (!result) return {};
    if (result.status === "VALID") return styles.valid;
    if (result.status === "USED") return styles.used;
    return styles.invalid;
  };

  return (
    <Layout>
      <div style={styles.card}>
        <h2>Verify QR Code</h2>

        <input
          placeholder="Paste QR Token"
          onChange={(e) => setQrToken(e.target.value)}
        />

        <button onClick={handleVerify}>Verify</button>

        {result && (
          <div style={getResultStyle()}>
            <strong>{result.status}</strong>
            <p>
              {result.productName
                ? `Product: ${result.productName}`
                : result.message}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

const styles = {
  card: {
    background: "#ffffff",
    padding: "25px",
    maxWidth: "420px",
    margin: "0 auto",
    borderRadius: "10px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  valid: {
    background: "#dcfce7",
    color: "#166534",
    padding: "12px",
    borderRadius: "6px",
  },
  used: {
    background: "#fef9c3",
    color: "#854d0e",
    padding: "12px",
    borderRadius: "6px",
  },
  invalid: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "12px",
    borderRadius: "6px",
  },
};

export default Verifier;

