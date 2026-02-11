import { useState } from "react";
import { generateQR } from "../services/api";
import Layout from "../components/Layout";
import { FaBox, FaHashtag, FaQrcode, FaDownload, FaSpinner } from "react-icons/fa"; // Professional icons

function Vendor() {
  const [productName, setProductName] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [error, setError] = useState(""); // New: For better error display
  const [loading, setLoading] = useState(false); // New: For loading state

  const handleGenerate = async () => {
    setLoading(true);
    setError(""); // Clear previous errors
    try {
      const token = localStorage.getItem("token");
      const res = await generateQR({ productName, batchNumber }, token);
      setQrImage(res.data.qrImage);
    } catch {
      setError("QR generation failed. Please check your inputs and try again."); // New: User-friendly error
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = () => {
    const link = document.createElement("a");
    link.href = qrImage;
    link.download = "qr-code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h2 style={styles.title}>Vendor Dashboard</h2>
          <p style={styles.subtitle}>Generate QR codes for your products</p>

          {error && <p style={styles.error}>{error}</p>} {/* New: Error display */}

          <div style={styles.inputContainer}>
            <FaBox style={styles.inputIcon} />
            <input
              style={styles.input}
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              aria-label="Product Name" // New: Accessibility
            />
          </div>

          <div style={styles.inputContainer}>
            <FaHashtag style={styles.inputIcon} />
            <input
              style={styles.input}
              placeholder="Batch Number"
              value={batchNumber}
              onChange={(e) => setBatchNumber(e.target.value)}
              aria-label="Batch Number" // New: Accessibility
            />
          </div>

          <button style={loading ? { ...styles.button, ...styles.buttonLoading } : styles.button} onClick={handleGenerate} disabled={loading}>
            {loading ? <FaSpinner style={styles.spinner} /> : <><FaQrcode style={{ marginRight: "8px" }} /> Generate QR</>} {/* New: Loading indicator and icon */}
          </button>

          {qrImage && (
            <div style={styles.qrSection}>
              <h3 style={styles.qrTitle}>Generated QR Code</h3>
              <img
                src={qrImage}
                alt="QR Code"
                style={styles.qrImage}
              />
              <button style={styles.downloadButton} onClick={downloadQR}>
                <FaDownload style={{ marginRight: "8px" }} /> Download QR Code
              </button>
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
    maxWidth: "500px",
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  qrSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    padding: "20px",
    border: "1px solid #ecf0f1",
    borderRadius: "8px",
    background: "#f9f9f9",
  },
  qrTitle: {
    color: "#2c3e50",
    fontSize: "18px",
    fontWeight: "600",
    margin: 0,
  },
  qrImage: {
    width: "200px",
    height: "200px",
    border: "2px solid #3498db",
    borderRadius: "8px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },
  downloadButton: {
    background: "#16a34a",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "background 0.3s ease",
    "&:hover": {
      background: "#15803d",
    },
  },
};


export default Vendor;

