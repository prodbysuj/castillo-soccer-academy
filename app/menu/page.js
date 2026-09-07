import Navbar from "../components/home-page/navbar";
import Cta from "../components/home-page/cta";
import RestaurantChatWidget from "../../curry-up-pizza-chat/RestaurantChatWidget";
import { site } from "../components/lib/site";
import {
  cyoPrices,
  menuSections,
  specialtyPizzaPrices,
} from "../components/lib/menu";
import pageStyles from "../page.module.css";
import styles from "./menu.module.css";

export const metadata = {
  title: `Menu · ${site.name}`,
  description: `Indian pizzas, classics, Jain and vegan options, Halal menu, wings, pasta, and starters at ${site.name}.`,
};

export default function MenuPage() {
  return (
    <div className={pageStyles.page}>
      <Navbar />
      <main className={pageStyles.main}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Menu</p>
          <h1 className={styles.title}>What we serve</h1>
          <p className={styles.lead}>
            Specialty pizza prices apply to The Classics, Indian pizzas, and
            Halal pizzas. Craft Your Own has its own list. Vegan pizzas are
            $25.99 on a 12&quot; gluten-free crust. Half ’n’ Half is Large and
            Extra Large only.
          </p>
        </header>

        <nav className={styles.jump} aria-label="Menu sections">
          {menuSections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.title}
            </a>
          ))}
        </nav>

        <section className={styles.prices} aria-labelledby="pizza-prices">
          <h2 id="pizza-prices" className={styles.pricesTitle}>
            Pizza sizes
          </h2>
          <div className={styles.priceGrid}>
            <PriceTable
              title="Specialty pizzas"
              rows={specialtyPizzaPrices}
            />
            <PriceTable title="Craft Your Own" rows={cyoPrices} />
          </div>
        </section>

        {menuSections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className={styles.section}
            aria-labelledby={`${section.id}-title`}
          >
            <h2 id={`${section.id}-title`} className={styles.sectionTitle}>
              {section.title}
            </h2>
            {section.intro ? <p className={styles.intro}>{section.intro}</p> : null}
            <ul className={styles.items}>
              {section.items.map((item) => (
                <li key={item.name} className={styles.item}>
                  <div className={styles.itemHead}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    {item.price ? (
                      <p className={styles.itemPrice}>{item.price}</p>
                    ) : null}
                  </div>
                  {item.description ? (
                    <p className={styles.itemBody}>{item.description}</p>
                  ) : null}
                  {item.note ? <p className={styles.itemNote}>{item.note}</p> : null}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p className={styles.disclaimer}>
          Ingredients and prices come from the restaurant menu. If the website
          and printed menu differ, the website listing is preferred. This page
          does not guarantee allergen-free preparation. For serious allergies,
          call {site.phoneLabel}.
        </p>
        <Cta />
      </main>
      <RestaurantChatWidget />
    </div>
  );
}

function PriceTable({ title, rows }) {
  return (
    <div className={styles.tableWrap}>
      <h3 className={styles.tableTitle}>{title}</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Size</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.size}>
              <td>{row.size}</td>
              <td>{row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
