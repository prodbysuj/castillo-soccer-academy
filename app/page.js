import Navbar from "./components/home-page/navbar";
import Hero from "./components/home-page/hero";
import AboutPreview from "./components/home-page/about-preview";
import Programs from "./components/home-page/programs";
import Cta from "./components/home-page/cta";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <Hero />
        <Programs />
        <AboutPreview />
        <Cta />
      </main>
    </div>
  );
}
