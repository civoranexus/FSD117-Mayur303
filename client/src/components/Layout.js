import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div style={styles.container}>{children}</div>
    </>
  );
}

const styles = {
  container: {
    minHeight: "calc(100vh - 60px)",
    padding: "30px",
  },
};

export default Layout;

