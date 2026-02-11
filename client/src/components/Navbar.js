import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // 👇 detect mouse near top
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientY <= 20) {
        setVisible(true);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const getTitle = () => {
    if (location.pathname.startsWith("/vendor"))
      return "QR Generation System";

    if (location.pathname.startsWith("/verifier"))
      return "QR Verification System";

    if (location.pathname.startsWith("/admin"))
      return "VendorVerify Admin Dashboard";

    return "VendorVerify";
  };

  return (
    <div
      style={{
        ...styles.nav,
        top: visible ? "0" : "-60px",
      }}
      onMouseLeave={() => setVisible(false)}
    >
      <h3 style={{ margin: 0 }}>{getTitle()}</h3>

      <button style={styles.logout} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  nav: {
    position: "fixed",
    top: "-60px",
    left: 0,
    width: "100%",
    height: "60px",
    background: "#142C52",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    zIndex: 999,
    transition: "top 0.35s ease-in-out",
  },
  logout: {
    background: "#F4F7FA",
    color: "black",
    padding: "8px 16px",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
  },
};

export default Navbar;




