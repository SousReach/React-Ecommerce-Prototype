import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { formatUSD } from "../utils/money";
import SafeImage from "../components/SafeImage";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Cart() {
  const navigate = useNavigate();

  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const setQty = useCartStore((s) => s.setQty);
  const subtotal = useCartStore((s) => s.subtotal());

  const shipping = items.length > 0 ? 4.99 : 0;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    const recommended = products.filter((p) => p.featured || p.isNew).slice(0, 3);

    return (
      <div className="container-pad py-10">
        <div className="card p-6">
          <div className="text-xl font-bold text-slate-900">Your cart is empty</div>
          <p className="mt-2 text-slate-600">
            Add items to your cart to see totals and checkout.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/products" className="btn-primary">
              Browse products
            </Link>
            <Link to="/wishlist" className="btn-ghost">
              View wishlist
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-end justify-between gap-3">
            <h2 className="text-xl font-bold text-slate-900">Recommended</h2>
            <Link className="text-brand-900 font-semibold hover:underline" to="/products">
              Shop all
            </Link>
          </div>

          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recommended.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-pad py-10">
      <div className="flex items-baseline justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-slate-900">Cart</h1>
        <Link to="/products" className="text-brand-900 font-semibold hover:underline">
          Continue shopping
        </Link>
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-4">
          {items.map((i) => (
            <div key={i.key} className="card p-4 flex gap-4">
              <div className="h-24 w-20 rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                <SafeImage
                  src={i.image}
                  alt={i.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-slate-900">{i.name}</div>
                    <div className="text-sm text-slate-600">
                      Size: <b>{i.variant.size}</b> • Color:{" "}
                      <span className="inline-flex items-center gap-2">
                        <span
                          className="h-3 w-3 rounded-full border border-slate-200"
                          style={{ backgroundColor: i.variant.color }}
                        />
                        <span className="font-mono text-xs">{i.variant.color}</span>
                      </span>
                    </div>
                  </div>
                  <div className="font-bold text-brand-900">{formatUSD(i.price)}</div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-slate-600">Qty</label>
                    <input
                      type="number"
                      min="1"
                      max="99"
                      className="input w-24"
                      value={i.qty}
                      onChange={(e) => setQty(i.key, e.target.value)}
                    />
                  </div>

                  <button
                    className="text-sm font-semibold text-red-600 hover:underline"
                    onClick={() => removeItem(i.key)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        <aside className="card p-5 h-fit">
          <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>

          <div className="mt-4 space-y-2 text-slate-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">{formatUSD(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold">{formatUSD(shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax (5%)</span>
              <span className="font-semibold">{formatUSD(tax)}</span>
            </div>
            <div className="pt-3 border-t border-slate-200 flex justify-between text-slate-900">
              <span className="font-bold">Total</span>
              <span className="font-extrabold text-brand-900">{formatUSD(total)}</span>
            </div>
          </div>

          <button className="btn-primary w-full mt-5" onClick={() => navigate("/checkout")}>
            Checkout
          </button>

          <div className="mt-3 text-xs text-slate-500">
            Demo checkout UI only — no payment processing.
          </div>
        </aside>
      </div>
    </div>
  );
}
