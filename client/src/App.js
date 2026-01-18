import Login from "./pages/Login";
import Register from "./pages/Register";
import Vendor from "./pages/Vendor";
import Verifier from "./pages/Verifier";
import Admin from "./pages/Admin";
import PublicNavbar from "./components/PublicNavbar";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Not logged in
  if (!token) {
    return (
      <div>
        <PublicNavbar />
        <Login />
      </div>
    );
  }

  // Logged in → role based dashboard
  if (role === "vendor") return <Vendor />;
  if (role === "verifier") return <Verifier />;
  if (role === "admin") return <Admin />;

  return <h2>Unauthorized</h2>;
}

export default App;





