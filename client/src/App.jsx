import { useState, useEffect } from "react";
import Home from "./pages/home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import axiosInstance from "./axios/axiosConfig";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LoginForm from "./pages/LoginForm/LoginForm";
import RgisterForm from "./pages/RgisterForm/RgisterForm";

const AuthWrapper = ({ setAuth }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  async function checkuser() {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axiosInstance.get("/users/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("User data:", data);
      setUser(data);
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401) navigate("/login");
    }
  }

  useEffect(() => {
    // const checkToken = async () => {
    //   const token = localStorage.getItem("token");
    //   if (!token) {
    //     setAuth(false); // No token, user is not authenticated
    //     navigate("/login");
    //     return;
    //   }
    //   try {
    //     // Send token to the server for validation
    //     await axiosInstance.get("/users/check", {
    //       headers: { Authorization: `Bearer ${token}` },
    //     });
    //     setAuth(true); // Token is valid, user is authenticated
    //   } catch (error) {
    //     console.error("Token validation failed", error);
    //     setAuth(false); // Invalid token, user is not authenticated
    //     localStorage.removeItem("token"); // Remove invalid token
    //     navigate("/login"); // Redirect to login
    //   }
    // };
    // checkToken();
    checkuser();
  }, []);

  return null; // No UI needed here
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Header />
      {/* AuthWrapper handles token validation on page load */}
      <AuthWrapper setAuth={setIsAuthenticated} />

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RgisterForm />} />
        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
