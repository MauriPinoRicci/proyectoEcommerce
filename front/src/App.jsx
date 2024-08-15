import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/navbar";
import Home from "./views/home/Home";
import MyAppointments from "./views/appointment/MyAppointments";
import Footer from "./components/footer/footer";
import "./index.css";
import Header from "./components/header/header";
import Contact from "./views/contact/Contact";

function App() {
  return (
    <div className="app-container">
      <NavBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Header />} />
          <Route path="/appoiments" element={<MyAppointments />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
