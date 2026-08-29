"use client";

import Image from "next/image";
import Link from "next/link";
import { site } from "../lib/site";
import { fill } from "../lib/i18n";
import { useLanguage } from "../language-provider";
import styles from "./about-preview.module.css";

export default function AboutPreview() {
  const { copy } = useLanguage();

  return (
    <section
      id="about"
      className={styles.section}
      aria-labelledby="about-preview-title"
    >
      <div className={styles.grid}>
        <div className={styles.photo}>
          <Image
            src="/profe-castillo/home.png"
            alt={fill(copy.about.photoAlt, { name: site.fullName })}
            fill
            sizes="(max-width: 800px) 92vw, 380px"
            className={styles.image}
          />
        </div>

        <div className={styles.copy}>
          <p className={styles.eyebrow}>{copy.about.eyebrow}</p>
          <h2 id="about-preview-title" className={styles.title}>
            {site.fullName}
          </h2>
          <div className={styles.body}>
            <p>{copy.about.p1}</p>
            <p>{copy.about.p2}</p>
            <p>{copy.about.p3}</p>
          </div>
          <Link href="/#programs" className={styles.link}>
            {copy.about.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
