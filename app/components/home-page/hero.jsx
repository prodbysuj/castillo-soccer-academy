"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { site } from "../lib/site";
import styles from "./hero.module.css";

const slides = [
  {
    src: "/slideshow-images/soccer-1.jpg",
    alt: "Two young athletes balancing on blue stability balls during outdoor soccer training",
  },
  {
    src: "/slideshow-images/soccer-2.webp",
    alt: "Players practicing ball control drills on the field at Prof Castillo Soccer Academy",
  },
  {
    src: "/slideshow-images/soccer-3.webp",
    alt: "Youth soccer players working on footwork and agility during a training session",
  },
  {
    src: "/slideshow-images/soccer-4.webp",
    alt: "Coach leading a group of young players through a soccer skills exercise",
  },
  {
    src: "/slideshow-images/soccer-5.webp",
    alt: "Athletes running drills together on the pitch under sunny skies",
  },
  {
    src: "/slideshow-images/soccer-6.webp",
    alt: "Team training moment with players focused on technique and teamwork",
  },
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

  const copies = [...slides, ...slides];

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
          <span className={styles.titleTop}>Prof Castillo</span>
          <span className={styles.titleBottom}>Soccer Academy</span>
        </motion.h1>

        <motion.p className={styles.tagline} variants={item}>
          {site.tagline}
        </motion.p>

        <motion.div
          className={styles.strip}
          variants={item}
          role="group"
          aria-label={`Training photos from ${site.name}`}
        >
          <div className={styles.viewport} ref={viewportRef}>
            <div
              className={`${styles.track} ${offscreen ? styles.trackPaused : ""}`}
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
        </motion.div>
      </motion.div>
    </section>
  );
}
