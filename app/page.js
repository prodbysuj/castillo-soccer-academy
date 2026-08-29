import Navbar from "./components/home-page/navbar";
import Hero from "./components/home-page/hero";
import Cta from "./components/home-page/cta";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <Hero />
        <Cta />
      </main>
    </div>
  );
}
