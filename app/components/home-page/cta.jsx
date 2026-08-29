"use client";

import { site } from "../lib/site";
import { fill } from "../lib/i18n";
import { useLanguage } from "../language-provider";
import styles from "./cta.module.css";

function PhoneIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
        d="M3 5a2 2 0 0 1 2-2h2.28a1 1 0 0 1 .948.684l1.2 3.6a1 1 0 0 1-.502 1.21l-1.5.9a16 16 0 0 0 7.374 7.374l.9-1.5a1 1 0 0 1 1.21-.502l3.6 1.2a1 1 0 0 1 .684.948V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path
        stroke="currentColor"
        strokeWidth="1.75"
        d="M12 21s7-7.58 7-12A7 7 0 0 0 5 9c0 4.42 7 12 7 12z"
      />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

export default function Cta() {
  const { copy } = useLanguage();

  return (
    <section className={styles.cta} aria-labelledby="cta-heading">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{copy.cta.eyebrow}</p>

        <h2 id="cta-heading" className={styles.title}>
          {copy.cta.title}
        </h2>

        <p className={styles.body}>
          {fill(copy.cta.body, { name: site.shortName })}
        </p>

        <div className={styles.actions}>
          <a href={site.phoneHref} className={styles.primary}>
            <PhoneIcon />
            {site.phoneLabel}
          </a>

          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            <MapPinIcon />
            {copy.cta.directions}
          </a>
        </div>

        <address className={styles.address}>{site.address}</address>
      </div>
    </section>
  );
}
