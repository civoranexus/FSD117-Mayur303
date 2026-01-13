import { useState } from "react";
import { generateQR } from "../services/api";

function Vendor() {
  const [productName, setProductName] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [qrImage, setQrImage] = useState("");

  const handleGenerate = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const res = await generateQR(
        { productName, batchNumber },
        token
      );

      setQrImage(res.data.qrImage);
    } catch (error) {
      alert("QR generation failed");
    }
  };

  return (
    <div>
      <h2>Vendor - Generate QR</h2>

      <input
        placeholder="Product Name"
        onChange={(e) => setProductName(e.target.value)}
      />

      <br />

      <input
        placeholder="Batch Number"
        onChange={(e) => setBatchNumber(e.target.value)}
      />

      <br />

      <button onClick={handleGenerate}>Generate QR</button>

      <br /><br />

      {qrImage && <img src={qrImage} alt="QR Code" />}
    </div>
  );
}

export default Vendor;
