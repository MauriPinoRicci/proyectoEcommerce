import styles from "./header.module.css";

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <h1 className={styles.headerTitle}>¡Welcome, Time to Study!</h1>
      <p className={styles.headerContent}>
        Hello dear students! I hope you are studying hard and above all enjoying the learning process!
        You are in the home page, to see the appointments in more detail, click on the -Mis Turnos- button.
        Keep going, greetings Isa!
      </p>
    </header>
  );
};

export default Header;
