import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/navbar";
import Home from "./views/home/Home";
import MyAppointments from "./views/appointment/MyAppointments";
import Footer from "./components/footer/footer";
import "./index.css";

function App() {
  return (
    <div className="app-container">
      <NavBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appoiments" element={<MyAppointments />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
