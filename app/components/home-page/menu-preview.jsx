import Link from "next/link";
import { featuredCategories } from "../lib/menu";
import styles from "./menu-preview.module.css";

export default function MenuPreview() {
  return (
    <section
      id="menu-preview"
      className={styles.section}
      aria-labelledby="menu-preview-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>The menu</p>
          <h2 id="menu-preview-title" className={styles.title}>
            Indian spice on a pizza crust
          </h2>
          <p className={styles.body}>
            Classics, Indian vegetarian and chicken pies, Jain and vegan
            options, a Halal menu, wings, pasta, and street-food starters.
          </p>
        </header>

        <div className={styles.grid}>
          {featuredCategories.map((category) => (
            <article
              key={category.id}
              className={`${styles.card} ${category.inverse ? styles.cardInverse : ""}`}
            >
              <h3 className={styles.cardTitle}>{category.name}</h3>
              <p className={styles.cardBody}>{category.summary}</p>
              <ul className={styles.points}>
                {category.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <Link href={category.href} className={styles.cardLink}>
                See this section
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
