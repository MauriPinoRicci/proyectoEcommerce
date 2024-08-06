import "./App.css";
import './index.css';
import NavBar from "./components/navbar/navbar";
import MyAppointments from "./views/appointment/myAppointments";
import Home from "./views/home/Home";
import Footer from "./components/footer/footer";

function App() {
  return (
    <div className="app-container">
      <NavBar />
      <Home />
      <MyAppointments/>
      <Footer />
    </div>
  );
}

export default App;
