import styles from "./Home.module.css";
import Login from "../login/Login";
import Register from "../register/Register";

const Home = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.headerTitle}>Welcome Student</h1>
      <Login />
      <Register />
    </main>
  );
};

export default Home;
