import Navbar from "./components/home-page/navbar";
import Hero from "./components/home-page/hero";
import AboutPreview from "./components/home-page/about-preview";
import MenuPreview from "./components/home-page/menu-preview";
import Cta from "./components/home-page/cta";
import RestaurantChatWidget from "../curry-up-pizza-chat/RestaurantChatWidget";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <Hero />
        <MenuPreview />
        <AboutPreview />
        <Cta />
      </main>
      <RestaurantChatWidget />
    </div>
  );
}
