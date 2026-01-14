import { useState } from "react";
import { verifyQR } from "../services/api";

function Verifier() {
  const [qrToken, setQrToken] = useState("");
  const [result, setResult] = useState("");

  const handleVerify = async () => {
    try {
      const jwt = localStorage.getItem("token");

      if (!jwt) {
        alert("Please login first");
        return;
      }

      const res = await verifyQR({ token: qrToken }, jwt);
      setResult(JSON.stringify(res.data, null, 2));
    } catch (error) {
      alert("Verification failed");
    }
  };

  return (
    <div>
      <h2>Verifier - Verify QR</h2>

      <input
        placeholder="Paste QR Token"
        onChange={(e) => setQrToken(e.target.value)}
      />

      <br />

      <button onClick={handleVerify}>Verify</button>

      <pre>{result}</pre>
    </div>
  );
}

export default Verifier;
