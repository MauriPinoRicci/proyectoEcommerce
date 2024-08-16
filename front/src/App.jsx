import { Routes, Route,useLocation} from "react-router-dom";
import NavBar from "./components/navbar/navbar";
import Home from "./views/home/Home";
import MyAppointments from "./views/appointment/MyAppointment";
import Footer from "./components/footer/footer";
import "./index.css";
import Header from "./components/header/header";
import Contact from "./views/contact/Contact";
import ErrorPage from "./views/errorpage/errorpage";

function App() {

  const location = useLocation();
  

  return (
    <div className="app-container">
      {location.pathname !== "/" && <NavBar />}
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Header />} />
          <Route path="/appoiments" element={<MyAppointments />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
