function PublicNavbar({ onLoginClick, onRegisterClick }) {
  return (
    <div style={styles.nav}>
      {/* Left side */}
      <div style={styles.left}>
        <button style={styles.link} onClick={onLoginClick}>
          Login
        </button>
        <button style={styles.link} onClick={onRegisterClick}>
          Register
        </button>
      </div>

      {/* Right side */}
      <div style={styles.right}>
        <h3>VendorVerify</h3>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    background: "#2563eb",
    color: "#fff",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    display: "flex",
    gap: "15px",
  },
  link: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
  right: {
    fontWeight: "bold",
  },
};

export default PublicNavbar;
