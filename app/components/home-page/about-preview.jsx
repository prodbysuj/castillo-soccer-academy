import Image from "next/image";
import { site } from "../lib/site";
import styles from "./about-preview.module.css";

export default function AboutPreview() {
  return (
    <section
      id="about"
      className={styles.section}
      aria-labelledby="about-preview-title"
    >
      <div className={styles.inner}>
        <div className={styles.photo}>
          <Image
            src={site.banner}
            alt=""
            width={1400}
            height={900}
            className={styles.photoImg}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            sizes="(max-width: 799px) 100vw, 55vw"
          />
        </div>

        <div className={styles.copy}>
          <h2 id="about-preview-title" className={styles.title}>
            Visit
          </h2>
          <p className={styles.blurb}>
            Indian pizza in Yorba Linda — butter sauce, curry, tikka, and
            tandoori, plus Jain, vegan, and Halal options.
          </p>

          <address className={styles.details}>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.line}
            >
              {site.address}
            </a>
            <a href={site.phoneHref} className={styles.line}>
              {site.phoneLabel}
            </a>
          </address>

          <ul className={styles.hours}>
            {site.hours.map((row) => (
              <li key={row.days}>
                <span>{row.days}</span>
                <span>{row.time}</span>
              </li>
            ))}
          </ul>
          <p className={styles.note}>{site.hoursNote}</p>
        </div>
      </div>
    </section>
  );
}
