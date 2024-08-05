import "./App.css";
import Home from "./views/Home";
<<<<<<< Updated upstream
import './index.css';
// import MisTurnos from "./views/MisTurnos";
=======
import MisTurnos from "./views/myAppointments";
import NavBar from "./components/navbar/navbar";
>>>>>>> Stashed changes

function App() {
  return (
    <>
      <NavBar />
      <Home />
      <MisTurnos/>
    </>
  );
}

export default App;
