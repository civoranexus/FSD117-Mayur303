import { useState } from "react";
import { generateQR } from "../services/api";
import Layout from "../components/Layout";

function Vendor() {
  const [productName, setProductName] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [qrImage, setQrImage] = useState("");

  const handleGenerate = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await generateQR({ productName, batchNumber }, token);
      setQrImage(res.data.qrImage);
    } catch {
      alert("QR generation failed");
    }
  };

  return (
    <Layout>
      <div style={styles.card}>
        <h2>Generate QR Code</h2>

        <input
          placeholder="Product Name"
          onChange={(e) => setProductName(e.target.value)}
        />

        <input
          placeholder="Batch Number"
          onChange={(e) => setBatchNumber(e.target.value)}
        />

        <button onClick={handleGenerate}>Generate QR</button>

        {qrImage && <img src={qrImage} alt="QR Code" />}
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
};

export default Vendor;

