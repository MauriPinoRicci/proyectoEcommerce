import styles from "./Home.module.css";
import Login from "../login/Login";
import Register from "../register/Register";

const Home = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.headerTitle}>Welcome Student</h1>
      <div className={styles.authContainer}>
        <div className={styles.textContainer}>
          <p>
            Hello, dear students! <br />
            <br />
            Welcome to the official website of Lic. Isabel Ricci! Here, you&apos;ll have
            the opportunity to easily schedule and cancel appointments, but
            first, you&apos;ll need to create an account (this is a mandatory
            requirement). <br />
            <br />
            I&apos;m excited to accompany you on your learning journey. Thank
            you for choosing to learn with me! <br />
            <br />
            Warm regards, <br />
            Isa
          </p>
        </div>
        <div className={styles.formsContainer}>
          <Login />
          <Register />
        </div>
      </div>
    </main>
  );
};

export default Home;
