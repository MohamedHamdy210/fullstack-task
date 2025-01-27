import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  const token = localStorage.getItem("token");
  const isTokenExpired = (token) => {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime; // Check if expiration time is in the past
  };
  if (!token || isTokenExpired(token)) {
    alert("you need to log in");
    return <Navigate to="/" replace />;
  }

  return children;
}
