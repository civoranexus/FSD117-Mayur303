import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import { verifyQR } from "../services/api";
import Layout from "../components/Layout";
import { FaCamera, FaKeyboard, FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaSpinner, FaQrcode } from "react-icons/fa"; // Professional icons

function Verifier() {
  const [qrToken, setQrToken] = useState("");
  const [result, setResult] = useState(null);
  const [scanMode, setScanMode] = useState(false);
  const [loading, setLoading] = useState(false); // New: For loading state during verification

  useEffect(() => {
    if (!scanMode) return;

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      async (decodedText) => {
        scanner.clear();
        setScanMode(false);
        setLoading(true); // New: Start loading
        try {
          const jwt = localStorage.getItem("token");
          const res = await verifyQR({ token: decodedText }, jwt);
          setResult(res.data);
        } catch {
          setResult({ status: "INVALID", message: "Verification failed" });
        } finally {
          setLoading(false); // New: End loading
        }
      },
      () => {}
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [scanMode]);

  const handleVerify = async () => {
    setLoading(true); // New: Start loading
    try {
      const jwt = localStorage.getItem("token");
      const res = await verifyQR({ token: qrToken }, jwt);
      setResult(res.data);
    } catch {
      setResult({ status: "INVALID", message: "Verification failed" });
    } finally {
      setLoading(false); // New: End loading
    }
  };

  const getResultStyle = () => {
    if (!result) return {};
    if (result.status === "VALID") return styles.valid;
    if (result.status === "USED") return styles.used;
    return styles.invalid;
  };

  const getResultIcon = () => {
    if (!result) return null;
    if (result.status === "VALID") return <FaCheckCircle style={styles.resultIcon} />;
    if (result.status === "USED") return <FaExclamationTriangle style={styles.resultIcon} />;
    return <FaTimesCircle style={styles.resultIcon} />;
  };

  return (
    <Layout>
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h2 style={styles.title}>Verifier Dashboard</h2>
          <p style={styles.subtitle}>Scan or verify QR codes for product authenticity</p>

          {/* Scan Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Scan QR Code</h3>
            <button
              style={styles.scanButton}
              onClick={() => setScanMode(true)}
              disabled={loading}
              aria-label="Scan QR using Camera"
            >
              <FaCamera style={{ marginRight: "8px" }} /> Scan with Camera
            </button>
            {scanMode && (
              <div
                id="qr-reader"
                style={styles.qrReader}
                aria-label="QR Code Scanner"
              ></div>
            )}
          </div>

          <hr style={styles.divider} />

          {/* Manual Verify Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Manual Verification</h3>
            <div style={styles.inputContainer}>
              <FaKeyboard style={styles.inputIcon} />
              <input
                style={styles.input}
                placeholder="Paste QR Token"
                value={qrToken}
                onChange={(e) => setQrToken(e.target.value)}
                aria-label="QR Token"
              />
            </div>
            <button
              style={loading ? { ...styles.button, ...styles.buttonLoading } : styles.button}
              onClick={handleVerify}
              disabled={loading || !qrToken.trim()}
            >
              {loading ? <FaSpinner style={styles.spinner} /> : <><FaQrcode style={{ marginRight: "8px" }} /> Verify Manually</>}
            </button>
          </div>

          {/* Result Display */}
          {result && (
            <div style={getResultStyle()}>
              {getResultIcon()}
              <strong>{result.status}</strong>
              <p>
                {result.productName
                  ? `Product: ${result.productName}`
                  : result.message}
              </p>
            </div>
          )}
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
    maxWidth: "600px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
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
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  subtitle: {
    textAlign: "center",
    color: "#7f8c8d",
    fontSize: "16px",
    margin: 0,
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  sectionTitle: {
    color: "#2c3e50",
    fontSize: "18px",
    fontWeight: "600",
    margin: 0,
  },
  scanButton: {
    background: "#3498db",
    color: "white",
    border: "none",
    padding: "15px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.3s ease",
    "&:hover": {
      background: "#2980b9",
    },
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.7,
    },
  },
  qrReader: {
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
    border: "2px solid #3498db",
    borderRadius: "8px",
    overflow: "hidden",
  },
  divider: {
    border: "none",
    height: "1px",
    background: "#ecf0f1",
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.3s ease",
    "&:hover": {
      background: "#2980b9",
    },
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.7,
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
  valid: {
    background: "#dcfce7",
    color: "#178740",
    padding: "20px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    transition: "all 0.3s ease",
    border: "1px solid #16a34a",
  },
  used: {
    background: "#fef9c3",
    color: "#e2c671",
    padding: "20px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    border: "1px solid #eab308",
  },
  invalid: {
    background: "#fee2e2",
    color: "#EF4444",
    padding: "20px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    border: "1px solid #dc2626",
  },
  resultIcon: {
    fontSize: "24px",
  },
};


export default Verifier;

