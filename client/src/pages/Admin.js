import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  getQrGenerationLogs,
  getQrVerificationLogs,
} from "../services/api";
import { FaQrcode, FaCheckCircle, FaSpinner, FaUser, FaBox, FaCalendarAlt, FaClock, FaExclamationTriangle } from "react-icons/fa"; // Professional icons

function Admin() {
  const [activeTab, setActiveTab] = useState("generation");
  const [generationLogs, setGenerationLogs] = useState([]);
  const [verificationLogs, setVerificationLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // New: For error handling

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const [genRes, verRes] = await Promise.all([
          getQrGenerationLogs(token),
          getQrVerificationLogs(token),
        ]);
        setGenerationLogs(genRes.data);
        setVerificationLogs(verRes.data);
      } catch (err) {
        setError("Failed to load logs. Please try refreshing the page.");
        console.error("Error fetching logs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <Layout>
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h2 style={styles.title}>Admin Dashboard</h2>
          <p style={styles.subtitle}>Monitor QR generation and verification activities</p>

          <div style={styles.tabs}>
            <button
              style={activeTab === "generation" ? { ...styles.tabButton, ...styles.activeTab } : styles.tabButton}
              onClick={() => setActiveTab("generation")}
              aria-label="View QR Generation Logs"
            >
              <FaQrcode style={{ marginRight: "8px" }} /> Generation Logs
            </button>
            <button
              style={activeTab === "verification" ? { ...styles.tabButton, ...styles.activeTab } : styles.tabButton}
              onClick={() => setActiveTab("verification")}
              aria-label="View QR Verification Logs"
            >
              <FaCheckCircle style={{ marginRight: "8px" }} /> Verification Logs
            </button>
          </div>

          {error && (
            <div style={styles.error}>
              <FaExclamationTriangle style={{ marginRight: "8px" }} />
              {error}
            </div>
          )}

          {loading ? (
            <div style={styles.loading}>
              <FaSpinner style={styles.spinner} />
              <p>Loading logs...</p>
            </div>
          ) : (
            <>
              {activeTab === "generation" && (
                <GenerationTable logs={generationLogs} />
              )}
              {activeTab === "verification" && (
                <VerificationTable logs={verificationLogs} />
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Admin;

/* ================= HELPERS ================= */

const getDate = (date) =>
  new Date(date).toLocaleDateString();

const getTime = (date) =>
  new Date(date).toLocaleTimeString();

/* ================= TABLES ================= */

function GenerationTable({ logs }) {
  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>
              <FaUser style={{ marginRight: "5px" }} /> Vendor
            </th>
            <th style={styles.th}>
              <FaBox style={{ marginRight: "5px" }} /> Product
            </th>
            <th style={styles.th}>
              <FaQrcode style={{ marginRight: "5px" }} /> Batch
            </th>
            <th style={styles.th}>
              <FaCalendarAlt style={{ marginRight: "5px" }} /> Date
            </th>
            <th style={styles.th}>
              <FaClock style={{ marginRight: "5px" }} /> Time
            </th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td colSpan="5" style={styles.noData}>No generation logs available.</td>
            </tr>
          ) : (
            logs.map((log) => (
              <tr key={log._id}>
                <td style={styles.td}>{log.vendorUsername}</td>
                <td style={styles.td}>{log.productName}</td>
                <td style={styles.td}>{log.batchNumber}</td>
                <td style={styles.td}>{getDate(log.createdAt)}</td>
                <td style={styles.td}>{getTime(log.createdAt)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function VerificationTable({ logs }) {
  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>
              <FaUser style={{ marginRight: "5px" }} /> Verifier
            </th>
            <th style={styles.th}>
              <FaBox style={{ marginRight: "5px" }} /> Product
            </th>
            <th style={styles.th}>
              <FaCheckCircle style={{ marginRight: "5px" }} /> Status
            </th>
            <th style={styles.th}>
              <FaCalendarAlt style={{ marginRight: "5px" }} /> Date
            </th>
            <th style={styles.th}>
              <FaClock style={{ marginRight: "5px" }} /> Time
            </th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td colSpan="5" style={styles.noData}>No verification logs available.</td>
            </tr>
          ) : (
            logs.map((log) => (
              <tr key={log._id}>
                <td style={styles.td}>{log.verifierUsername}</td>
                <td style={styles.td}>{log.productName}</td>
                <td
                  style={{
                    ...styles.td,
                    fontWeight: "600",
                    color:
                      log.status === "VALID"
                        ? "#16a34a"
                        : log.status === "USED"
                        ? "#eab308"
                        : "#dc2626",
                  }}
                >
                  {log.status}
                </td>
                <td style={styles.td}>{getDate(log.createdAt)}</td>
                <td style={styles.td}>{getTime(log.createdAt)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    backgroundSize: "400% 400%",
    animation: "gradientShift 10s ease infinite",
    padding: "20px",
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    maxWidth: "1200px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease",
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
  tabs: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  tabButton: {
    background: "#ecf0f1",
    color: "#2c3e50",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "background 0.3s ease",
  },
  activeTab: {
    background: "#3498db",
    color: "white",
  },
  error: {
    color: "#e74c3c",
    textAlign: "center",
    fontSize: "14px",
    padding: "10px",
    background: "#fee2e2",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    padding: "40px",
  },
  spinner: {
    animation: "spin 1s linear infinite",
    fontSize: "24px",
    color: "#3498db",
  },
  tableContainer: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
    borderRadius: "8px",
    overflow: "hidden",
  },
  th: {
    textAlign: "left",
    padding: "15px 12px",
    backgroundColor: "#f4f6f8",
    fontWeight: "600",
    borderBottom: "2px solid #ddd",
    color: "#2c3e50",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
    color: "#34495e",
  },
  noData: {
    textAlign: "center",
    padding: "40px",
    color: "#7f8c8d",
    fontStyle: "italic",
  },
};


// export default Admin;



