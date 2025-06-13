import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoutes";
import { useAuth } from "./customHooks/useAuth";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import NotFoundPage from "./pages/NotFoundPage";
import SessionManager from "./components/SessionManager";

const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
    <SessionManager/>
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to='/dashboard' replace /> : <Navigate to="/login" replace />} />


      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }
      />

      <Route path = "*" element= {<NotFoundPage/>} />
    </Routes>
    </>
  )
};

export default App;