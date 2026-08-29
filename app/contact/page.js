import Navbar from "../components/home-page/navbar";
import ContactForm from "../components/home-page/contact-form";
import Cta from "../components/home-page/cta";
import { site } from "../components/lib/site";
import styles from "../page.module.css";

export const metadata = {
  title: `Contact · ${site.name}`,
  description: `Ask about a training spot for your player at ${site.name}.`,
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <ContactForm framed={false} />
        <Cta />
      </main>
    </div>
  );
}
