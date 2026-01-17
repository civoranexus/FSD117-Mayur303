function AuthNavbar() {
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div style={styles.nav}>
      <div style={styles.left}>
        <h3>{role?.toUpperCase()} DASHBOARD</h3>
      </div>

      <div style={styles.right}>
        <button style={styles.btn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    background: "#1e293b",
    color: "#fff",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    background: "#ef4444",
    border: "none",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default AuthNavbar;
