import { Link } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useWishlistStore } from "../store/wishlistStore";

export default function Wishlist() {
  const ids = useWishlistStore((s) => s.ids);
  const clear = useWishlistStore((s) => s.clear);

  const saved = products.filter((p) => ids.includes(p.id));

  if (saved.length === 0) {
    return (
      <div className="container-pad py-10">
        <div className="card p-6">
          <h1 className="text-2xl font-extrabold text-slate-900">Wishlist</h1>
          <p className="mt-2 text-slate-600">You haven’t saved anything yet.</p>
          <Link to="/products" className="btn-primary mt-4 inline-flex">
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-pad py-10">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Wishlist</h1>
          <p className="mt-1 text-slate-600 text-sm">
            Saved items: <b>{saved.length}</b>
          </p>
        </div>

        <button className="btn-ghost" onClick={clear}>
          Clear
        </button>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {saved.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
