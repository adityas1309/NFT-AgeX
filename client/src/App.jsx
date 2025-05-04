import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router";
import Landing from "./pages/Landing";
import NotFound from "./pages/404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
