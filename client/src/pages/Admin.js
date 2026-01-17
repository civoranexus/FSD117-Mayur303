import AuthNavbar from "../components/AuthNavbar";

function Admin() {
  return (
    <>
      <AuthNavbar />
      <div style={{ padding: "30px" }}>
        <h2>Admin Dashboard</h2>
        <p>System monitoring access</p>
      </div>
    </>
  );
}

export default Admin;

