import { Link } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import SafeImage from "../components/SafeImage";
import { useRecentStore } from "../store/recentStore";

export default function Home() {
  const featured = products.filter((p) => p.featured).slice(0, 6);

  const recentIds = useRecentStore((s) => s.ids);
  const recent = recentIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 6);

  return (
    <div>
      {/* ✅ Hero now matches dark mode */}
      <section className="bg-gradient-to-b from-brand-50 to-white dark:from-slate-950 dark:to-slate-950">
        <div className="container-pad py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="badge bg-brand-50 text-brand-900 border border-brand-300 dark:bg-slate-900 dark:text-brand-300 dark:border-slate-700">
                New Season Drop
              </span>

              <h1 className="mt-4 text-4xl font-extrabold tracking-tight">
                Reach Clothing Store
              </h1>

              <p className="mt-4 leading-relaxed text-slate-600">
                Reach for style, comfort, and confidence — all in one place. Premium everyday essentials designed to move with you.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/products" className="btn-primary">
                  Shop Now
                </Link>
                <Link to="/products?category=Hoodies" className="btn-ghost">
                  Explore Products
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 text-sm text-slate-600">
                <div className="card p-3">
                  <div className="font-semibold">Frontend</div>
                  <div className="text-xs">No backend connected yet. Soon to be connected with node.js and node express feature</div>
                </div>
                <div className="card p-3">
                  <div className="font-semibold">Fast Response</div>
                  <div className="text-xs">Build with Vite and Tailwind</div>
                </div>
                <div className="card p-3">
                  <div className="font-semibold">Cart</div>
                  <div className="text-xs">Persistent</div>
                </div>
              </div>
            </div>

            <div className="card overflow-hidden">
              <SafeImage
                alt="Hero"
                src="/placeholders/hoodie.svg"
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {recent.length > 0 && (
        <section className="container-pad pt-10">
          <div className="flex items-end justify-between gap-3">
            <h2 className="text-2xl font-bold">Recently Viewed Products</h2>
            <Link className="text-brand-900 dark:text-brand-300 font-semibold hover:underline" to="/products">
              Shop all
            </Link>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recent.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <section className="container-pad py-10">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link className="text-brand-900 dark:text-brand-300 font-semibold hover:underline" to="/products">
            View all
          </Link>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
