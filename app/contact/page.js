import Navbar from "../components/home-page/navbar";
import ContactForm from "../components/home-page/contact-form";
import Cta from "../components/home-page/cta";
import RestaurantChatWidget from "../../curry-up-pizza-chat/RestaurantChatWidget";
import { site } from "../components/lib/site";
import styles from "../page.module.css";

export const metadata = {
  title: `Contact · ${site.name}`,
  description: `Call ${site.name} or send a note about the menu, pickup, or a group order.`,
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <ContactForm framed={false} />
        <Cta />
      </main>
      <RestaurantChatWidget />
    </div>
  );
}
