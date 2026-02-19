import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { products } from "../data/products";
import { useCartStore } from "../store/cartStore";
import { formatUSD } from "../utils/money";
import SafeImage from "../components/SafeImage";
import { useRecentStore } from "../store/recentStore";
import { ShoppingBag } from "lucide-react";

export default function ProductDetail() {
  const { productId } = useParams();

  const product = useMemo(
    () => products.find((p) => p.id === productId),
    [productId]
  );

  const addItem = useCartStore((s) => s.addItem);
  const recordView = useRecentStore((s) => s.view);

  const [imgIdx, setImgIdx] = useState(0);
  const [size, setSize] = useState(product?.sizes?.[0] ?? "M");
  const [color, setColor] = useState(product?.colors?.[0] ?? "#09637E");

  useEffect(() => {
    if (product?.id) recordView(product.id);
  }, [product?.id, recordView]);

  if (!product) {
    return (
      <div className="container-pad py-10">
        <div className="card p-6">
          <div className="font-bold text-slate-900">Product not found</div>
          <Link className="text-brand-900 font-semibold hover:underline" to="/products">
            Back to shop
          </Link>
        </div>
      </div>
    );
  }

  function onAdd() {
    addItem(product, { size, color });
    toast.success("Added to cart");
  }

  return (
    <div className="container-pad py-10">
      <div className="text-sm text-slate-600">
        <Link className="hover:underline" to="/products">Shop</Link> /{" "}
        <span className="text-slate-900 font-semibold">{product.name}</span>
      </div>

      <div className="mt-6 grid lg:grid-cols-2 gap-8 pb-24 md:pb-0">
        <div className="card overflow-hidden">
          <div className="aspect-[4/5] bg-slate-50">
            <SafeImage
              src={product.images?.[imgIdx]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          {(product.images ?? []).length > 1 && (
            <div className="p-4 flex gap-3 overflow-auto">
              {(product.images ?? []).map((src, i) => (
                <button
                  key={src}
                  onClick={() => setImgIdx(i)}
                  className={`h-20 w-16 overflow-hidden rounded-xl border ${i === imgIdx ? "border-brand-900" : "border-slate-200"
                    }`}
                  title={`Image ${i + 1}`}
                >
                  <SafeImage className="h-full w-full object-cover" src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">{product.name}</h1>
          <div className="mt-2 text-slate-600">{product.category}</div>

          <div className="mt-4 text-2xl font-bold text-brand-900">
            {formatUSD(product.price)}
          </div>

          <p className="mt-4 text-slate-700 leading-relaxed">{product.description}</p>

          <div className="mt-6 card p-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-slate-700">Size</label>
                <select
                  className="input mt-2"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  {(product.sizes ?? []).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">Color</label>
                <div className="mt-2 flex gap-2 flex-wrap">
                  {(product.colors ?? []).map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`h-9 w-9 rounded-full border ${c === color
                          ? "border-brand-900 ring-2 ring-brand-300"
                          : "border-slate-200"
                        }`}
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button className="btn-primary flex-1" onClick={onAdd}>
                Add to Cart
              </button>
              <Link className="btn-ghost" to="/cart">
                Go to Cart
              </Link>
            </div>
          </div>

          <div className="mt-5 text-sm text-slate-500">
            Demo frontend only — no payment processing yet.
          </div>
        </div>
      </div>

      {/* ✅ Sticky Add-to-Cart bar (mobile only) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur border-t border-slate-100 dark:border-slate-800">
        <div className="container-pad py-3 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-slate-900 truncate">{product.name}</div>
            <div className="text-sm font-bold text-brand-900">{formatUSD(product.price)}</div>
          </div>

          <button className="btn-primary whitespace-nowrap" onClick={onAdd}>
            <ShoppingBag className="h-5 w-5 mr-2" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
