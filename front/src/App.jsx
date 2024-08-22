// App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Home from "./views/home/Home";
import MyAppointments from "./views/appointment/MyAppointment";
import Footer from "./components/footer/Footer";
import Header from "./components/header/header";
import Contact from "./views/contact/Contact";
import ErrorPage from "./views/errorpage/ErrorPage";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import "./index.css";

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="app-container">
      {!isHomePage && <NavBar />}
      {isHomePage ? (
        <Home />
      ) : (
        <div className="content">
          <Routes>
            <Route path="/home" element={<Header />} />
            <Route path="/appointments" element={<ProtectedRoute element={<MyAppointments />} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
