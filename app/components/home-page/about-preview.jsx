import Image from "next/image";
import Link from "next/link";
import { site } from "../lib/site";
import styles from "./about-preview.module.css";

export default function AboutPreview() {
  return (
    <section
      id="about"
      className={styles.section}
      aria-labelledby="about-preview-title"
    >
      <div className={styles.grid}>
        <div className={styles.photo}>
          <Image
            src={site.banner}
            alt=""
            width={800}
            height={1000}
            className={styles.photoImg}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className={styles.panel}>
          <p className={styles.panelEyebrow}>Visit</p>
          <address className={styles.address}>{site.address}</address>
          <ul className={styles.hours}>
            {site.hours.map((row) => (
              <li key={row.days}>
                <span>{row.days}</span>
                <span>{row.time}</span>
              </li>
            ))}
          </ul>
          <p className={styles.hoursNote}>{site.hoursNote}</p>
        </div>

        <div className={styles.copy}>
          <p className={styles.eyebrow}>About</p>
          <h2 id="about-preview-title" className={styles.title}>
            {site.name}
          </h2>
          <div className={styles.body}>
            <p>
              Curry Up Pizza is an Indian pizza restaurant in Yorba Linda.
              The kitchen builds pies with butter sauce, curry, tikka,
              tandoori, and the usual red, garlic, BBQ, and pesto bases.
            </p>
            <p>
              The menu also has Jain pizzas without onion or garlic, vegan
              pizzas on a 12&quot; gluten-free crust, a Halal menu, wings,
              pasta, samosas, and pani puri.
            </p>
            <p>
              For allergens or a serious dietary need, call the restaurant.
              We do not treat this site as a medical or allergen-free
              guarantee.
            </p>
          </div>
          <Link href="/menu" className={styles.link}>
            Read the full menu
          </Link>
        </div>
      </div>
    </section>
  );
}
