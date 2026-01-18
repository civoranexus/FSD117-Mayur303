import { useEffect, useState } from "react";
import axios from "axios";
import AuthNavbar from "../components/AuthNavbar";

function Admin() {
  const [users, setUsers] = useState([]);
  const [qrs, setQrs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data));

    axios
      .get("http://localhost:5000/api/admin/qrcodes", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setQrs(res.data));
  }, []);

  return (
    <>
      <AuthNavbar />
      <div style={styles.container}>
        <h2>Admin Dashboard</h2>

        <h3>Users</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>QR Codes</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Batch</th>
              <th>Vendor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {qrs.map((q) => (
              <tr key={q._id}>
                <td>{q.productName}</td>
                <td>{q.batchNumber}</td>
                <td>{q.vendor?.name}</td>
                <td>{q.isUsed ? "USED" : "VALID"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: "30px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "30px",
  },
};

export default Admin;


