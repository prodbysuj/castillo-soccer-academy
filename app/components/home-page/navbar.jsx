"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site, navLinks } from "../lib/site";
import styles from "./navbar.module.css";

const MAPS_URL = site.mapsUrl;
const PHONE_HREF = site.phoneHref;
const PHONE_LABEL = site.phoneLabel;
const MAPS_LABEL = `Open ${site.name} in Google Maps`;

function MapPinIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        d="M12 21s7-7.58 7-12A7 7 0 0 0 5 9c0 4.42 7 12 7 12z"
      />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3 5a2 2 0 0 1 2-2h2.28a1 1 0 0 1 .948.684l1.2 3.6a1 1 0 0 1-.502 1.21l-1.5.9a16 16 0 0 0 7.374 7.374l.9-1.5a1 1 0 0 1 1.21-.502l3.6 1.2a1 1 0 0 1 .684.948V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event) {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      toggleRef.current?.focus();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <div className={styles.bar}>
        <Link
          href="/"
          aria-label={`${site.name} home`}
          className={styles.brand}
        >
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={styles.brandInner}
          >
            <span className={styles.mark} aria-hidden="true">
              <span className={styles.markBall} />
            </span>
            <span className={styles.wordmark}>
              <span className={styles.brandTop}>Prof Castillo</span>
              <span className={styles.brandBottom}>Soccer Academy</span>
            </span>
          </motion.div>
        </Link>

        <div className={styles.desktopLinks}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.link} ${isActive ? styles.linkActive : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className={styles.desktopMeta}>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={MAPS_LABEL}
            className={styles.mapLink}
          >
            <MapPinIcon />
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className={`${styles.toggle} ${menuOpen ? styles.toggleOpen : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.75"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.75"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className={styles.mobileMenu}
          >
            <div className={styles.mobileInner}>
              <div className={styles.mobileNavGroup}>
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ""}`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              <div className={styles.mobileDivider} aria-hidden="true" />

              <div className={styles.mobileContact}>
                <a href={PHONE_HREF} className={styles.mobilePhone}>
                  <PhoneIcon />
                  {PHONE_LABEL}
                </a>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={MAPS_LABEL}
                  className={styles.mobileMapLink}
                >
                  <MapPinIcon />
                  Open in Maps
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
