import styles from "./Home.module.css";
import Login from "../login/Login";
import Register from "../register/Register";

const Home = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.headerTitle}>Welcome Student</h1>
      <div className={styles.authContainer}>
        <Login />
        <Register />
      </div>
    </main>
  );
};

export default Home;
