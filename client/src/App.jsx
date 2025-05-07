import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router";
import { useContext } from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import NotFound from "./pages/404";
import Home from "./pages/Home";
import { WalletContext } from "./context/WalletContext";

const ProtectedRoute = ({ element }) => {
  const { account } = useContext(WalletContext);

  return account ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
