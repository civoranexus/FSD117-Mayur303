import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={styles.nav}>
      <h3>QR Verification System</h3>
      <button style={styles.logout} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  nav: {
    height: "60px",
    background: "#1e293b",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
  },
  logout: {
    background: "#ef4444",
    padding: "8px 14px",
    borderRadius: "6px",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
};

export default Navbar;


