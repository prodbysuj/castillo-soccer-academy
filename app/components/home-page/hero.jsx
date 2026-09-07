"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { site } from "../lib/site";
import { useHydrated } from "../lib/use-hydrated";
import styles from "./hero.module.css";

const TICKER = [
  "Butter Chicken",
  "Butter Paneer",
  "Tandoori",
  "Jain",
  "Vegan",
  "Halal",
  "Samosa",
  "Pani Puri",
  "Wings",
  "Pasta",
  "Margherita",
  "Craft Your Own",
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.13, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const badge = {
  hidden: { opacity: 0, scale: 0.6 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  const hydrated = useHydrated();
  const [offscreen, setOffscreen] = useState(false);
  const viewportRef = useRef(null);

  useEffect(() => {
    const node = viewportRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setOffscreen(!entry.isIntersecting),
      { rootMargin: "150px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const copies = [...TICKER, ...TICKER];

  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <motion.div
        className={styles.stage}
        variants={container}
        initial="hidden"
        animate={hydrated ? "show" : "hidden"}
      >
        <motion.div className={styles.badge} variants={badge}>
          <span className={styles.ring} aria-hidden="true">
            CU
          </span>
        </motion.div>

        <motion.h1 id="hero-title" className={styles.title} variants={item}>
          <span className={styles.titleTop}>Indian pizza</span>
          <span className={styles.titleBottom}>Curry Up Pizza</span>
        </motion.h1>

        <motion.p className={styles.tagline} variants={item}>
          {site.tagline}
        </motion.p>

        <motion.div className={styles.actions} variants={item}>
          <Link href="/menu" className={styles.primary}>
            View the menu
          </Link>
          <a href={site.phoneHref} className={styles.secondary}>
            Call {site.phoneLabel}
          </a>
        </motion.div>

        <motion.div
          className={styles.strip}
          variants={item}
          role="group"
          aria-label="Menu highlights"
        >
          <div className={styles.viewport} ref={viewportRef}>
            <div
              className={`${styles.track} ${offscreen ? styles.trackPaused : ""}`}
            >
              {copies.map((label, index) => {
                const isDuplicate = index >= TICKER.length;

                return (
                  <div
                    key={`${label}-${index}`}
                    className={styles.card}
                    aria-hidden={isDuplicate ? "true" : undefined}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
