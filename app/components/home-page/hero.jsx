"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { site } from "../lib/site";
import { fill } from "../lib/i18n";
import { useLanguage } from "../language-provider";
import styles from "./hero.module.css";

const SLIDE_SRC = [
  "/slideshow-images/soccer-1.jpg",
  "/slideshow-images/soccer-2.webp",
  "/slideshow-images/soccer-3.webp",
  "/slideshow-images/soccer-4.webp",
  "/slideshow-images/soccer-5.webp",
  "/slideshow-images/soccer-6.webp",
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

function Chevron({ direction }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={
          direction === "prev"
            ? "M14.5 5 7.5 12l7 7"
            : "M9.5 5 16.5 12l-7 7"
        }
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Hero() {
  const { copy } = useLanguage();
  const [offscreen, setOffscreen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [nudge, setNudge] = useState(0);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);

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

  function step(direction) {
    const track = trackRef.current;
    const card = track?.querySelector(`.${styles.card}`);
    if (!track || !card) return;

    const gap = Number.parseFloat(getComputedStyle(track).gap) || 16;
    const delta = card.getBoundingClientRect().width + gap;

    setPaused(true);
    setNudge((value) => value - direction * delta);
  }

  const slides = SLIDE_SRC.map((src, index) => ({
    src,
    alt: fill(copy.hero.slides[index], { name: site.name }),
  }));
  const copies = [...slides, ...slides];
  const stopped = paused || offscreen;

  return (
    <section id="training" className={styles.hero} aria-labelledby="hero-title">
      <motion.div
        className={styles.stage}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className={styles.badge} variants={badge}>
          <span className={styles.ring} aria-hidden="true" />
          <motion.span
            aria-hidden="true"
            className={styles.ball}
            animate={{ rotate: 360 }}
            transition={{ duration: 44, ease: "linear", repeat: Infinity }}
          />
        </motion.div>

        <motion.h1 id="hero-title" className={styles.title} variants={item}>
          <span className={styles.titleTop}>Profe Castillo’s</span>
          <span className={styles.titleBottom}>{copy.hero.lineTwo}</span>
        </motion.h1>

        <motion.p className={styles.tagline} variants={item}>
          {copy.tagline}
        </motion.p>

        <motion.div
          className={styles.strip}
          variants={item}
          role="group"
          aria-label={fill(copy.hero.photos, { name: site.name })}
        >
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowPrev}`}
            aria-label={copy.hero.prev}
            onClick={() => step(-1)}
          >
            <Chevron direction="prev" />
          </button>

          <div className={styles.viewport} ref={viewportRef}>
            <div
              className={styles.nudge}
              style={{ transform: `translateX(${nudge}px)` }}
            >
              <div
                ref={trackRef}
                className={`${styles.track} ${stopped ? styles.trackPaused : ""}`}
              >
              {copies.map((slide, index) => {
                const isDuplicate = index >= slides.length;

                return (
                  <div
                    key={`${slide.src}-${index}`}
                    className={styles.card}
                    aria-hidden={isDuplicate ? "true" : undefined}
                  >
                    <Image
                      className={styles.image}
                      src={slide.src}
                      alt={isDuplicate ? "" : slide.alt}
                      fill
                      sizes="(max-width: 700px) 76vw, 390px"
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                  </div>
                );
              })}
              </div>
            </div>
          </div>

          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowNext}`}
            aria-label={copy.hero.next}
            onClick={() => step(1)}
          >
            <Chevron direction="next" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
