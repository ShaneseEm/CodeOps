import Link from "next/link";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import AddToCartButton from "../../components/AddToCartButton";

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), "public", "dishes.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const dishes = JSON.parse(rawData);

  return dishes.map((dish) => ({
    id: dish.id.toString(),
  }));
}

/**
 * Exercise 3 & Mini-Project Dynamic Dish Metadata:
 * - Generates custom title using name and price
 * - Human-readable description derived from dish record (name, price in ETB, description)
 * - Dynamic OpenGraph and Twitter card metadata pointing to per-dish ImageResponse
 * - Canonical URL pointing directly to /menu/[id]
 */
export async function generateMetadata({ params }) {
  const filePath = path.join(process.cwd(), "public", "dishes.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const dishes = JSON.parse(rawData);
  const dish = dishes.find((d) => d.id.toString() === params.id);

  if (!dish) {
    return {
      title: "Dish Not Found",
      description: "The requested Ethiopian dish could not be found in our menu catalog.",
    };
  }

  const description = `Order freshly prepared ${dish.name} for ${dish.price} ETB at Addis Eats. ${dish.description} Served hot with fresh teff injera across Addis Ababa.`;

  return {
    title: `${dish.name} (${dish.price} ETB)`,
    description: description,
    alternates: {
      canonical: `/menu/${dish.id}`,
    },
    openGraph: {
      title: `${dish.name} - ${dish.price} ETB | Addis Eats`,
      description: description,
      url: `/menu/${dish.id}`,
      type: "article",
      images: [
        {
          url: `/menu/${dish.id}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${dish.name} - ${dish.price} ETB at Addis Eats`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${dish.name} - ${dish.price} ETB | Addis Eats`,
      description: description,
      images: [`/menu/${dish.id}/opengraph-image`],
    },
  };
}

/**
 * DishDetailPage - Pure Async Server Component
 * Fetches dish details server-side without hooks.
 * Injects MenuItem JSON-LD generated from the same dish record.
 * Renders exactly one <h1> matching the dish name.
 */
export default async function DishDetailPage({ params }) {
  const filePath = path.join(process.cwd(), "public", "dishes.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const dishes = JSON.parse(rawData);
  const dish = dishes.find((d) => d.id.toString() === params.id);

  if (!dish) {
    notFound();
  }

  // Exercise 5: MenuItem JSON-LD generated from the same dish object rendered on the page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.description,
    image: `https://addiseats.et/menu/${dish.id}/opengraph-image`,
    offers: {
      "@type": "Offer",
      price: dish.price,
      priceCurrency: "ETB",
      availability: "https://schema.org/InStock",
      url: `https://addiseats.et/menu/${dish.id}`,
      seller: {
        "@type": "Restaurant",
        name: "Addis Eats",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Addis Ababa",
          addressCountry: "ET",
        },
      },
    },
    suitableForDiet: dish.category === "Vegan" ? "https://schema.org/VeganDiet" : undefined,
  };

  return (
    <div className="dish-detail-card">
      {/* Schema.org MenuItem JSON-LD structured data script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href="/menu" className="back-link">
        &larr; Back to Full Menu
      </Link>
      <div className="dish-detail-body">
        <div className="dish-badge-row">
          <span className="dish-badge">{dish.category}</span>
          {dish.spicy && <span className="spicy-badge">🔥 Authentic Spicy Blend</span>}
        </div>
        {/* Exactly one h1 on the page describing the dish */}
        <h1 className="dish-detail-title">{dish.name}</h1>
        <p className="dish-detail-desc">{dish.description}</p>
        <div className="dish-detail-footer">
          <div className="price-tag">
            <span className="label">Price:</span>
            {/* Matches JSON-LD price in ETB exactly */}
            <span className="amount">{dish.price} ETB</span>
          </div>
          {/* Leaf interactive component */}
          <AddToCartButton dish={dish} />
        </div>
      </div>
    </div>
  );
}
