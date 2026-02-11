import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
      {/* hover zone */}
      <div style={styles.hoverZone} />

      <Navbar />

      <div style={styles.container}>{children}</div>
    </>
  );
}

const styles = {
  hoverZone: {
    position: "fixed",
    top: 0,
    height: "10px",
    width: "100%",
    zIndex: 998,
  },
  container: {
    minHeight: "100vh",
    padding: "30px",
    paddingTop: "40px",
  },
};

export default Layout;

