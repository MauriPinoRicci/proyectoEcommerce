import NavBar from "../components/navbar/navbar";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <main className={styles.main}>
      
      <NavBar />
      <Header />
      <Footer />

    </main>
  );
};

export default Home;
