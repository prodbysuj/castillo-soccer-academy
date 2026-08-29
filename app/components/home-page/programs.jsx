"use client";

import Link from "next/link";
import { site } from "../lib/site";
import { fill } from "../lib/i18n";
import { useLanguage } from "../language-provider";
import styles from "./programs.module.css";

function PersonIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <circle cx="12" cy="8" r="3.25" strokeWidth="1.5" />
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M5.5 19.25c.7-3.2 3.3-5 6.5-5s5.8 1.8 6.5 5"
      />
    </svg>
  );
}

function GroupIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <circle cx="9" cy="8.5" r="2.75" strokeWidth="1.5" />
      <circle cx="16" cy="9" r="2.25" strokeWidth="1.5" />
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M3.75 19c.6-2.9 2.8-4.5 5.25-4.5 2.45 0 4.65 1.6 5.25 4.5"
      />
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M13.5 14.7c1.7-.5 3.7.4 4.75 2.8"
      />
    </svg>
  );
}

const SAMPLES = [
  { id: "individual", href: "/contact", Icon: PersonIcon, inverse: false },
  { id: "group", href: "/contact", Icon: GroupIcon, inverse: true },
];

export default function Programs() {
  const { copy } = useLanguage();

  return (
    <section
      id="programs"
      className={styles.section}
      aria-labelledby="programs-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{copy.programs.eyebrow}</p>
          <h2 id="programs-title" className={styles.title}>
            {copy.programs.title}
          </h2>
          <p className={styles.body}>
            {fill(copy.programs.body, { name: site.shortName })}
          </p>
        </header>

        <div className={styles.grid}>
          {SAMPLES.map((sample) => {
            const text = copy.programs[sample.id];

            return (
              <article
                key={sample.id}
                className={`${styles.card} ${sample.inverse ? styles.cardInverse : ""}`}
              >
                <div className={styles.icon} aria-hidden="true">
                  <sample.Icon />
                </div>
                <h3 className={styles.cardTitle}>{text.name}</h3>
                <p className={styles.cardBody}>{text.summary}</p>
                <ul className={styles.points}>
                  {text.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <Link href={sample.href} className={styles.cardLink}>
                  {text.cta}
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
