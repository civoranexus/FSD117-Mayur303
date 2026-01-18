function Navbar() {
  return (
    <div style={styles.nav}>
      <h3>VendorVerify System</h3>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
        style={styles.logout}
      >
        Logout
      </button>
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
  logout: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    cursor: "pointer",
  },
};

export default Navbar;
