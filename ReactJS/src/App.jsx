import Login from "./components/Login";
import WorklistPage from "./components/WorklistPage";
import AddExam from "./components/AddExam";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            <WorklistPage />
          </ProtectedRoutes>
        }
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/addexam"
        element={
          <ProtectedRoutes>
            <AddExam />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
}

export default App;
