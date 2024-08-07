import './index.css';
import NavBar from "./components/navbar/navbar";
import Home from "./views/home/Home";
import Footer from "./components/footer/footer";
import MyAppointments from './views/appointment/MyAppointments';


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
