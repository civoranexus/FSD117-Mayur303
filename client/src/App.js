import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Vendor from "./pages/Vendor";
import Verifier from "./pages/Verifier";
import Register from "./pages/Register";
import Admin from "./pages/Admin";



const isLoggedIn = () => {
  return localStorage.getItem("token");
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Vendor Route */}
        <Route
          path="/vendor"
          element={isLoggedIn() ? <Vendor /> : <Navigate to="/login" />}
        />

        {/* Verifier Route */}
        <Route
          path="/verifier"
          element={isLoggedIn() ? <Verifier /> : <Navigate to="/login" />}
        />

        {/* register Route */}
        {
         <Route path="/register" element={<Register />} />

        }

        {/* admin route */}
        {
          <Route
  path="/admin"
  element={
    localStorage.getItem("token") ? <Admin /> : <Navigate to="/login" />
  }
/>

        }

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



