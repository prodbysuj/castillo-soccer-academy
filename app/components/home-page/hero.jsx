import Image from "next/image";
import Link from "next/link";
import { site } from "../lib/site";
import { featuredCategories } from "../lib/menu";
import { featuredImages } from "../lib/menu-images";
import { Logo } from "../logo";
import styles from "./hero.module.css";

export default function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.stage}>
        <Logo className={styles.logo} size={88} alt="" priority />
        <h1 id="hero-title" className={styles.title}>
          {site.name}
        </h1>
        <p className={styles.address}>{site.address}</p>
        <div className={styles.actions}>
          <a
            href={site.orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primary}
          >
            Order Now
          </a>
          <Link href="/menu" className={styles.secondary}>
            View Menu
          </Link>
        </div>
      </div>

      <div
        id="menu-preview"
        className={styles.gallery}
        role="navigation"
        aria-label="Menu highlights"
      >
        {featuredCategories.map((category, index) => {
          const image = featuredImages[category.id];
          const highlight = category.points[0];

          return (
            <Link key={category.id} href={category.href} className={styles.tile}>
              {image ? (
                <Image
                  src={image}
                  alt=""
                  width={900}
                  height={900}
                  className={styles.tilePhoto}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  sizes="(max-width: 899px) 50vw, 25vw"
                  priority={index < 2}
                />
              ) : null}
              <span className={styles.tileShade} aria-hidden="true" />
              <span className={styles.tileCopy}>
                <span className={styles.tileName}>{category.name}</span>
                {highlight ? (
                  <span className={styles.tileHint}>{highlight}</span>
                ) : null}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
