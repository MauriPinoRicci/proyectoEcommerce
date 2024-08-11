import './index.css';
import NavBar from "./components/navbar/navbar";
import Home from "./views/home/Home";
import MyAppointments from "./views/appointment/MyAppointments";
import Login from './views/login/Login';
import Register from './views/register/Register';
import Footer from "./components/footer/footer";

function App() {
  return (
    <div className="app-container">
      <NavBar />
      <div className="content">
        <Home />
        <MyAppointments />
        <Login/>
        <Register/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
